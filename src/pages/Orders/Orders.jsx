import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import CartCard from '../../components/CartCard/CartCard'
import myApi from '../../service/service'
import './Orders.css'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { BiCart, BiBuildingHouse, BiCheck } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import Spinner from '../../components/Spinner/Spinner'


const Orders = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "ショッピングカート", link: "/cart" },
    { label: "配達先情報", link: "/checkout" },
    { label: "最終確認", active: true },
  ];
  const { user, setUser } = useContext(AuthContext)
  const [product, setProduct] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  const shippingFee = totalPrice >= 10000 ? 0 : 1500;

  if (!user) {
    return <Spinner />
  }

  useEffect(() => {
    const url = '/cart'
    myApi
      .get(url)
      .then((res) => { setProduct(res.data) })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => calculateTotalPrice(), [product])

  useEffect(() => {
    const newFinalPrice = Number(shippingFee) + Number(totalPrice);
    setFinalPrice(newFinalPrice);
  }, [shippingFee, totalPrice]);

  function calculateTotalPrice() {
    if (!product) return
    const allPrices = product.reduce((acc, val) => {
      return acc + val.qty * val.product.price
    }, 0)
    const formattedPrice = allPrices.toLocaleString();
    const numericPrice = Number(formattedPrice.replace(/,/g, ''));
    setTotalPrice(numericPrice);
  }
  if (!product) return <Spinner />

  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className='Orders'>
        <div className='container'>
          <div className="process-checkout">
            <div className="process-box">
              <Link to='/cart'>
                <div className="circle">
                  <BiCart className='cart-icon' />
                </div>
                <p>商品情報</p>
              </Link>
            </div>
            <hr />
            <div className="process-box">
              <Link to='/checkout'>
                <div className="circle">
                  <BiBuildingHouse className='cart-icon' />
                </div>
                <p>配達先情報</p>
              </Link>
            </div>
            <div />
            <hr />
            <div className="process-box">
              <Link to='/checkout'>
                <div className="circle">
                  <MdPayment className='cart-icon' />
                </div>
                <p>お支払方法</p>
              </Link>
            </div>
            <hr />
            <div className="process-box">
              <div className="circle">
                <BiCheck className='cart-icon' />
              </div>
              <p>最終確認</p>
            </div>
          </div>

          <div className='final-order-container'>
            <div className='service-box'>
              <div className='user-info'>
                <table>
                  <tbody>
                    <tr>
                      <td className='first-td'>お名前</td>
                      <td className='second-td'>{user.username}</td>
                    </tr>
                    <tr>
                      <td>配達先住所</td>
                      <td>〒{user.shippingAddress.postalCode}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{user.shippingAddress.prefecture}{user.shippingAddress.city}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{user.shippingAddress.town}{user.shippingAddress.addressA}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{user.shippingAddress.addressB}</td>
                    </tr>
                    <tr>
                      <td>電話番号</td>
                      <td>{user.shippingAddress.phoneNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


              {product && (
                <div className='validProduct'>
                  {
                    product.map((item) => {
                      return <CartCard key={item.product._id} item={item} />
                    })
                  }
                </div>
              )}
            </div>
            <div className='validPayment'>
              <div className="order-shokei-section">
                <span>小計</span>
                <span>{totalPrice.toLocaleString()} 円</span>
              </div>
              <div className="order-soryo-section">
                <span>送料</span>
                <span>{shippingFee.toLocaleString()} 円</span>
              </div>
              <div className="order-gokei-section">
                <span>合計</span>
                <span>{finalPrice.toLocaleString()} 円</span>
              </div>
              {user && (
                <div>
                  {paymentMethod === 'creditCard' &&
                    <CreditCardPayment />}
                  {paymentMethod === 'paypal' &&
                    <PayPalPayment />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
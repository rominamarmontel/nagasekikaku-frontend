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
import { FaArrowRight } from 'react-icons/fa'

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
                <b>配達先情報</b>
                {user.shippingAddress && (
                  <ul>
                    <li>{user.username}</li>
                    <li>〒{user.shippingAddress.postalCode}</li>
                    <li>{user.shippingAddress.prefecture}</li>
                    <li>{user.shippingAddress.city}</li>
                    <li>{user.shippingAddress.town}</li>
                    <li>{user.shippingAddress.addressA}</li>
                    <li>{user.shippingAddress.addressB}</li>
                    <li>TEL: {user.shippingAddress.phoneNumber}</li>
                  </ul>
                )}
              </div>


              {product && (
                <div className='validProduct'>
                  <div className='validProduct-title'>
                    <b>ご注文の商品</b>
                  </div>
                  {
                    product.map((item) => {
                      return <CartCard key={item.product._id} item={item} />
                    })
                  }
                </div>
              )}
            </div>


            <div className='validPayment'>
              <div>
                <b>お支払いに関する注意事項</b>
              </div>
              <div className="order-shokei-section">
                <table>
                  <tbody>
                    <tr>
                      <td>小計</td>
                      <td>{totalPrice.toLocaleString()} 円</td>
                    </tr>
                    <tr>
                      <td>送料</td>
                      <td>{shippingFee.toLocaleString()} 円</td>
                    </tr>
                    <tr>
                      <td>お支払い合計</td>
                      <td>{finalPrice.toLocaleString()} 円</td>
                    </tr>
                  </tbody>
                </table>
                {user && (
                  <div>
                    {paymentMethod === 'creditCard' &&
                      <CreditCardPayment />}
                    {paymentMethod === 'paypal' &&
                      <PayPalPayment />}
                  </div>
                )}
                <div className="process-to-next">
                  <Link to="/payload">
                    <button>お支払いを確定する
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
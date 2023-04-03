import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import CartCard from '../../components/CartCard/CartCard'
import myApi from '../../service/service'
import './Orders.css'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'


const Orders = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "ショッピングカート", link: "/cart" },
    { label: "購入の手続き", link: "/checkout" },
    { label: "お支払いの手続き", active: true },
  ];
  const { user, setUser } = useContext(AuthContext)
  const [product, setProduct] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('')

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

  // useEffect(() => {
  //   const url = '/cart/paymentMethod'
  //   myApi
  //     .get(url)
  //     .then((res) => { setPaymentMethod(res.data) })
  //     .catch((error) => console.error(error))
  // })
  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className='Orders'>
        <div className='container'>
          <div className='service-box'>
            <div className='title'>
              <h2>商品の確認</h2>
              <h2>購入のお手続き</h2>
              <h2>ご注文内容の確認</h2>
            </div>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor='username'>お名前</label></td>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <td><label htmlFor='postalCode'>配達先住所</label></td>
                  <td>〒{user.shippingAddress.postalCode}</td>
                  <td>{user.shippingAddress.prefecture}{user.shippingAddress.city}</td>
                  <td>{user.shippingAddress.town}{user.shippingAddress.addressA}</td>
                  <td>{user.shippingAddress.addressB}</td>
                  <td>TEL: {user.shippingAddress.phoneNumber}</td>
                </tr>
              </tbody>
            </table>
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
    </>
  )
}

export default Orders
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import CartCard from '../../components/CartCard/CartCard'
import myApi from '../../service/service'

const Orders = () => {
  const { user, setUser } = useContext(AuthContext)
  const [postalCode, setPostalCode] = useState(user.shippingAddress?.postalCode || '')
  const [prefecture, setPrefecture] = useState(user.shippingAddress?.prefecture || '')
  const [city, setCity] = useState(user.shippingAddress?.city || '')
  const [town, setTown] = useState(user.shippingAddress?.town || '')
  const [addressA, setAddressA] = useState(user.shippingAddress?.addressA || '')
  const [addressB, setAddressB] = useState(user.shippingAddress?.addressB || '')
  const [phoneNumber, setPhoneNumber] = useState(user.shippingAddress?.phoneNumber || '')
  const [isAddressValid, setIsAddressValid] = useState(false)
  const [product, setProduct] = useState(null)

  if (!user) {
    return <Spinner />
  }

  const fetchCart = () => {
    myApi
      .get('/cart')
      .then((res) => {
        setProduct(res.data)
      })
      .catch((e) => console.error(e))
  }
  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div className='Orders'>
      <h2>ご注文内容の確認</h2>
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
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default Orders
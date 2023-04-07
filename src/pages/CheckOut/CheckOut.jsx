import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod'
import './CheckOut.css'
import Zenkaku2hankaku from '../../components/Zenkaku2hankaku/Zenkaku2hankaku'
import axios from 'axios'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { BiCart, BiBuildingHouse, BiCheck } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import CreditCard from '../../components/PaymentMethod/CreditCard/CreditCard'

const CheckOut = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "ショッピングカート", link: "/cart" },
    { label: "購入の手続き", active: true },
  ];
  const { user, setUser } = useContext(AuthContext)
  const [postalCode, setPostalCode] = useState(user.shippingAddress?.postalCode || '')
  const [prefecture, setPrefecture] = useState(user.shippingAddress?.prefecture || '')
  const [city, setCity] = useState(user.shippingAddress?.city || '')
  const [town, setTown] = useState(user.shippingAddress?.town || '')
  const [addressA, setAddressA] = useState(user.shippingAddress?.addressA || '')
  const [addressB, setAddressB] = useState(user.shippingAddress?.addressB || '')
  const [phoneNumber, setPhoneNumber] = useState(user.shippingAddress?.phoneNumber || '')
  const [isAddressValid, setIsAddressValid] = useState(false)


  const handlePostalCodeChange = async (event) => {
    const value = Zenkaku2hankaku(event.target.value)
    const res = await axios.get('https://api.zipaddress.net/?zipcode=' + value);
    if (res.data.code === 200) {
      setPrefecture(res.data.data.pref);
      setCity(res.data.data.city);
      setTown(res.data.data.town);
      setPostalCode(value)
    }
  }
  const handleAddressAChange = (event) => {
    setAddressA(Zenkaku2hankaku(event.target.value))
  }
  const handleAddressBChange = (event) => {
    setAddressB(Zenkaku2hankaku(event.target.value))
  }
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(Zenkaku2hankaku(event.target.value))
  }

  const handleAddressValidation = () => {
    if (postalCode.trim() === '') {
      alert('郵便番号がありません')
      return
    }
    // if (prefecture.trim() === '') {
    //   alert('都道府県がありません')
    //   return
    // }
    // if (city.trim() === '') {
    //   alert('市町村がありません')
    //   return
    // }
    // if (town.trim() === '') {
    //   alert('町名がありません')
    //   return
    // }
    // if (addressA.trim() === '') {
    //   alert('番地がありません')
    //   return
    // }
    if (!phoneNumber) {
      alert('電話番号を確認してください')
      return
    }
    setIsAddressValid(true)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    handleAddressValidation()
  }


  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className='CheckOut'>
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
            <div className="circle">
              <BiBuildingHouse className='cart-icon' />
            </div>
            <p>配達先情報</p>
          </div>
          <div />
          <hr />
          <div className="process-box">
            <div className="circle">
              <MdPayment className='cart-icon' />
            </div>
            <p>お支払方法</p>
          </div>
          <hr />
          <div className="process-box">
            <div className="circle">
              <BiCheck className='cart-icon' />
            </div>
            <p>最終確認</p>
          </div>
        </div>
        <div className='container'>
          <div className='process1'>
            <form className='shippingAddress' onSubmit={handleSubmit}>
              <h3>1. 配達先住所の確認</h3>
              <table>
                <tbody>
                  <tr>
                    <td><label htmlFor='postalCode'>郵便番号</label></td>
                    <td><input type="text" name='postalCode' id='postalCode' defaultValue={user.shippingAddress.postalCode} onChange={handlePostalCodeChange} placeholder='郵便番号' /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='city'>都道府県</label></td>
                    <td><input type="text" value={prefecture} name='city' id='city' placeholder='都道府県' disabled={true} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='city'>市町村</label></td>
                    <td><input type="text" value={city} name='city' id='city' placeholder='市町村' disabled={true} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='city'>町名</label></td>
                    <td><input type="text" value={town} name='town' id='town' placeholder='町名' disabled={true} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='addressA'>番地</label></td>
                    <td><input type="text" value={addressA} name='addressA' id='addressA' placeholder='番地' onChange={handleAddressAChange} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='addressB'>その他</label></td>
                    <td><input type="text" value={addressB} name='addressB' id='addressB' placeholder='アパート名、何号室など' onChange={handleAddressBChange} /></td>

                  </tr>
                  <tr>
                    <td><label htmlFor='phoneNumber'>電話番号</label></td>
                    <td><input type="text" value={phoneNumber} name='phoneNuber' id='phoneNumber' onChange={handlePhoneNumberChange} placeholder='0901234567' /></td>

                  </tr>
                </tbody>
              </table>
              <div className="form-address-btns">
                <button type='submit'>確認して次に進む</button>
              </div>
            </form>
          </div>

          {isAddressValid && (
            <PaymentMethod />
          )}
        </div>
      </div >
    </>
  )
}

export default CheckOut
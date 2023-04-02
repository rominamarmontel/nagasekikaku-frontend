import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './FormEditAddress.css'
import myApi from '../../../service/service'
import axios from "axios";
import Zenkaku2hankaku from '../../../components/Zenkaku2hankaku/Zenkaku2hankaku';


const EditAddress = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [postalCode, setPostalCode] = useState(user.shippingAddress.postalCode)
  const [prefecture, setPrefecture] = useState(user.shippingAddress.prefecture)
  const [city, setCity] = useState(user.shippingAddress.city)
  const [town, setTown] = useState(user.shippingAddress.town)
  const [addressA, setAddressA] = useState(user.shippingAddress.addressA)
  const [addressB, setAddressB] = useState(user.shippingAddress.addressB)
  const [phoneNumber, setPhoneNumber] = useState(user.shippingAddress.phoneNumber)
  const [message, setMessage] = useState('')

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

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(Zenkaku2hankaku(event.target.value))
  }
  const handleAddressAChange = (event) => {
    setAddressA(Zenkaku2hankaku(event.target.value))
  }
  const handleAddressBChange = (event) => {
    setAddressB(Zenkaku2hankaku(event.target.value))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const editedAddress = {
      shippingAddress: {
        postalCode,
        prefecture,
        city,
        town,
        addressA,
        addressB,
        phoneNumber
      }
    }
    try {
      const response = await myApi.patch('/user/edit', editedAddress)
      setUser(response.data)
      navigate('/profile')
    } catch (error) {
      console.log(error)
      setMessage('保存中に問題が発生しました')
    }
  }

  return (
    <div className='FormEditAddress'>
      <h2>配達先住所の編集</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor='postalCode'>郵便番号</label></td>
              <td><input type="text" className='postalCode' name='postalCode' defaultValue={user.shippingAddress.postalCode} id='postalCode' onChange={handlePostalCodeChange} placeholder='例)1234567' /></td>
            </tr>
            <tr>
              <td><label htmlFor='prefecture'>都道府県</label></td>
              <td><input type="text" value={prefecture} name='prefecture' id='prefecture' placeholder='都道府県' disabled={true} /></td>
            </tr>
            <tr>
              <td><label htmlFor='city'>市町村</label></td>
              <td><input type="text" value={city} name='city' id='city' placeholder='市町村' disabled={true} /></td>
            </tr>
            <tr>
              <td><label htmlFor='town'>町名</label></td>
              <td><input type="text" value={town} name='town' id='town' placeholder='町名' disabled={true} /></td>
            </tr>
            <tr>
              <td><label htmlFor='addressA'>番地</label></td>
              <td><input type="text" value={addressA} name='addressA' id='addressA' onChange={handleAddressAChange} placeholder='番地' /></td>
            </tr>
            <tr>
              <td><label htmlFor='addressB'>その他</label></td>
              <td><input type="text" value={addressB} name='addressB' id='addressB' onChange={handleAddressBChange} placeholder='アパート・マンション名、号室等' /></td>
            </tr>
            <tr>
              <td><label htmlFor='phoneNumber'>電話番号</label></td>
              <td><input type="text" value={phoneNumber} name='phoneNumber' id='phoneNumber' onChange={handlePhoneNumberChange} placeholder='09012345678' /></td>
            </tr>
          </tbody>
        </table>

        <button>保存</button>
        <Link to='/profile'>キャンセル</Link>
      </form>
      <div>{message}</div>
    </div>
  )
}

export default EditAddress
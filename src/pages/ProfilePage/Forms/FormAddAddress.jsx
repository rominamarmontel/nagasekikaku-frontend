import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './FormAddAddress.css'
import myApi from '../../../service/service'
import axios from "axios";
import Zenkaku2hankaku from '../../../components/Zenkaku2hankaku/Zenkaku2hankaku';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const AddAddress = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "アカウントページ", link: "/profile" },
    { label: "配達先住所の新規作成", active: true },
  ];
  const { user, setUser } = useContext(AuthContext)
  const [addressA, setAddressA] = useState(user.shippingAddressA?.addressA || '')
  const [addressB, setAddressB] = useState(user.shippingAddressB?.addressB || '')
  const [prefecture, setPrefecture] = useState(user.shippingAddress?.prefecture || '')
  const [town, setTown] = useState(user.shippingAddress?.town || '')
  const [city, setCity] = useState(user.shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(user.shippingAddress?.postalCode || '')
  const [phoneNumber, setPhoneNumber] = useState(user.shippingAddress?.phoneNumber || '')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

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


  const handleSubmit = async (event) => {
    event.preventDefault()
    const newAddress = {
      shippingAddress: {
        postalCode,
        prefecture,
        city,
        town,
        addressA,
        addressB,
        phoneNumber,
      }
    }
    try {
      const response = await myApi.patch('/user/edit', newAddress)
      setUser(response.data)
      navigate('/profile')

    } catch (error) {
      setMessage('An error occurred while creating changes')
    }
  }

  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className='FormAddAddress'>
        <div className='title'>
          <h2>配達先住所の登録</h2>
        </div>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor='postalCode'>郵便番号</label></td>
                  <td><input type="text" className='postalCode' id='postalCode' name='postalCode' placeholder='例)1234567' onChange={handlePostalCodeChange} /></td>
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
                  <td><input type="text" value={town} name='city' id='town' placeholder='町名' disabled={true} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='addressA'>番地</label></td>
                  <td><input type="text" value={addressA} name='addressA' id='addressA' onChange={handleAddressAChange} placeholder='それ以外の住所' /></td>
                </tr>
                <tr>
                  <td><label htmlFor='addressB'>その他</label></td>
                  <td><input type="text" value={addressB} name='addressB' id='addressB' onChange={handleAddressBChange} placeholder='アパート・マンション名、号室等' /></td>
                </tr>
                <tr>
                  <td><label htmlFor='phoneNumber'>携帯電話</label></td>
                  <td><input type="text" value={phoneNumber} name='phoneNumber' id='phoneNumber' onChange={handlePhoneNumberChange} placeholder='09012345678' /></td>
                </tr>
              </tbody>
            </table>
            <div className='save-btns'>
              <button>登録する</button>
              <Link to='/profile' className='cancel'>キャンセル</Link>
            </div>
          </form>
          <div>{message}</div>
        </div>
      </div>
    </>
  )
}

export default AddAddress
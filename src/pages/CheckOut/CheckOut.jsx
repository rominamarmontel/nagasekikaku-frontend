import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod'
import './CheckOut.css'

const CheckOut = () => {
  const { user, setUser } = useContext(AuthContext)
  const [address, setAddress] = useState(user.shippingAddress?.address || '')
  const [postalCode, setPostalCode] = useState(user.shippingAddress?.postalCode || '')
  const [city, setCity] = useState(user.shippingAddress?.city || '')
  const [isAddressValid, setIsAddressValid] = useState(false)

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleAddressValidation = () => {
    if (address.trim() === '') {
      alert('Please enter a valid address.')
      return
    }
    if (postalCode.trim() === '') {
      alert('Please enter a valid postal code.')
      return
    }
    if (city.trim() === '') {
      alert('Please enter a valid city.')
      return
    }
    setIsAddressValid(true)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    handleAddressValidation()
  }

  return (

    <div className='CheckOut'>
      <h2>Check out</h2>
      <div className='form'>
        <form className='shippingAddress' onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor='postalCode'>郵便番号:</label></td>
                <td><input type="text" value={postalCode} name='postalCode' id='postalCode' onChange={handlePostalCodeChange} placeholder='郵便番号' /></td>
              </tr>
              <tr>
                <td><label htmlFor='city'>都道府県:</label></td>
                <td><input type="text" value={city} name='city' id='city' onChange={handleCityChange} placeholder='都道府県' /></td>
              </tr>
              <tr>
                <td><label htmlFor='address'>住所</label></td>
                <td><input type="text" value={address} name='address' id='address' onChange={handleAddressChange} placeholder='住所' /></td>
              </tr>
            </tbody>
          </table>
          <div className="form-address-btns">
            <button type='submit'>Confirm Address</button>
          </div>
        </form>

      </div>


      {isAddressValid && (
        <div className='form'>
          <PaymentMethod />
        </div>
      )}
    </div>
  )
}

export default CheckOut
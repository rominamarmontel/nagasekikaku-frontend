import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaymentMethod.css'
import CreditCard from './CreditCard/CreditCard'
import PayPal from './PayPal/PayPal'

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value)
  }

  const validateOrder = () => {
    return !!paymentMethod
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!paymentMethod) {
      setErrorMessage('Please choose a payment method.')
      return
    }

    if (!validateOrder()) {
      setErrorMessage('Your order is not valid.')
      return
    }
    navigate('/orders')
  }

  return (
    <div className='PaymentMethod'>

      <form onSubmit={handleSubmit}>
        <h3>2.支払い方法の確認</h3>

        <table>
          <tbody>
            <tr>
              <td><input type='radio' id='creditCard' name='paymentMethod' value='creditCard' checked={paymentMethod === 'creditCard'} onChange={handlePaymentMethodChange} /></td>
              <td><label htmlFor='creditCard'>クレジットカード</label></td>
            </tr>

            <tr>
              <td><input type='radio' id='paypal' name='paymentMethod' value='paypal' checked={paymentMethod === 'paypal'} onChange={handlePaymentMethodChange} /></td>
              <td><label htmlFor='paypal'>Paypal</label></td>
            </tr>
          </tbody>
        </table>

        {errorMessage && <p className='error'>{errorMessage}</p>}
      </form>
      {paymentMethod === 'creditCard' && <CreditCard />}
      {paymentMethod === 'paypal' && <PayPal />}
    </div>
  )
}

export default PaymentMethod

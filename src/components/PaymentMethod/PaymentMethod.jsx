import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreditCard from './CreditCard/CreditCard'
// import PayPal from './PayPal/PayPal'

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const navigate = useNavigate()
  const [orderDetails, setOrderDetails] = useState({});

  const validateCreditCardForm = () => {
    const cardHolderRegex = /^[a-zA-Z ]+$/;
    const cardNumberRegex = /^[0-9]{16}$/;
    const today = new Date();
    // const expirationYear = parseInt(formData.expirationYear);
    // const expirationMonth = parseInt(formData.expirationMonth);
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const currentYear = currentDate.getFullYear().toString().slice(-2);
    const cvvRegex = /^[0-9]{3}$/;

    if (!cardHolderRegex.test(formData.cardHolder)) {
      alert('Invalid card holder name.');
      return false;
    }
    if (formData.cardHolder.trim().length < 1 || formData.cardHolder.trim().length > 30) {
      alert('Card holder name should be between 1 and 30 characters.');
      return false;
    }
    if (!cardNumberRegex.test(formData.cardNumber)) {
      alert('Invalid card number.');
      return false;
    }
    if (formData.expirationYear < currentYear || (formData.expirationYear === currentYear && formData.expirationMonth <= currentMonth)) {
      alert('Card expired.');
      return false;
    }
    if (!cvvRegex.test(formData.cvv)) {
      alert('Invalid CVV.');
      return false;
    }
    return true;
  };

  const handleOrderSubmit = () => {
    console.log('Order submitted!');
    navigate('/orders');
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value)
  }

  const validateOrder = () => {
    return !!paymentMethod
  }

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!paymentMethod) {
      alert("お支払い方法を選択してください")
      return
    }
    if (paymentMethod === 'creditCard' && !validateCreditCardForm()) {
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
      <div className='process2'>
        <h3>2.支払い方法の確認</h3>
        <div className='method-box'>
          <div>
            <input type='radio' id='creditCard' name='paymentMethod' value='creditCard' checked={paymentMethod === 'creditCard'} onChange={handlePaymentMethodChange} />
            <label htmlFor='creditCard'>クレジットカード</label>
          </div>
          <div>
            <input type='radio' id='paypal' name='paymentMethod' value='paypal' checked={paymentMethod === 'paypal'} onChange={handlePaymentMethodChange} />
            <label htmlFor='paypal'>Paypal</label>
          </div>
        </div>
        {paymentMethod === 'creditCard' && <CreditCard onOrderSubmit={handleOrderSubmit} />}
        {/* {paymentMethod === 'paypal' && <PayPal handleSubmit={handleSubmit} orderDetails={orderDetails} />} */}
      </div>
    </div>
  )
}

export default PaymentMethod
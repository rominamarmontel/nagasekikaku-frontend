import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CreditCard.css'

function CreditCard(props) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform validation of form data
    if (
      formData.cardNumber !== "" &&
      formData.cardHolder !== "" &&
      formData.expirationMonth !== "" &&
      formData.expirationYear !== "" &&
      formData.cvv !== ""
    ) {
      // call parent function to submit order
      props.onOrderSubmit()
    } else {
      alert("Please fill in all required fields")
    }
  }

  return (
    <div className='CreditCard'>
      <form className='credit-card-form' onSubmit={handleSubmit} >
        <h3>3. カード情報の入力</h3>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="cardHolder">カードの名義</label></td>
              <td><input type="text" id="cardHolder" name="cardHolder" value={formData.cardHolder} onChange={handleInputChange} placeholder='YAMADA TARO'/*required*/ /></td>
            </tr>

            <tr>
              <td><label htmlFor='cardNumber'>カード番号</label></td>
              <td><input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder='123 xxx xxxx xxxx'/* required */ /></td>
            </tr>

            <tr>
              <td><label htmlFor="expirationMonth">有効期限</label></td>
              <td><input type="text" id="expirationMonth" name="expirationMonth" value={formData.expirationMonth} onChange={handleInputChange} placeholder='03'/*required*/ /></td>
              <td> / </td>
              <td><input type="text" id="expirationYear" name="expirationYear" value={formData.expirationYear} onChange={handleInputChange} placeholder='26'/*required */ /></td>
            </tr>

            <tr>
              <td><label htmlFor='cvv'>CVV</label></td>
              <td><input type='text' id='cvv' name='cvv' value={formData.cvv} onChange={handleInputChange} placeholder='123'/*required*/ /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">確認したら次へ進む</button>
        <Link to='/cart'>カートに戻る</Link>
      </form>
    </div>
  )
}

export default CreditCard

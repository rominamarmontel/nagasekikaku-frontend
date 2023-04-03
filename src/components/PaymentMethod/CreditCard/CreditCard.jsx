import React, { useState } from 'react'

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
      alert("記入ができていない箇所があります")
    }
  }

  return (
    <div className='CreditCard'>
      <div className='process3'>
        <form className='credit-card-form' onSubmit={handleSubmit} >
          <h3>3. カード情報の入力</h3>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="cardHolder">カードの名義</label></td>
                <td><input type="text" id="cardHolder" name="cardHolder" value={formData.cardHolder} onChange={handleInputChange} placeholder='例) YAMADA TARO'/*required*/ /></td>
              </tr>

              <tr>
                <td><label htmlFor='cardNumber'>カード番号</label></td>
                <td><input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder='例) 1234 XXXX XXXX XXXX'/* required */ /></td>
              </tr>

              <tr>
                <td><label htmlFor="expirationMonth">有効期限（月）</label></td>
                <td><input type="text" id="expirationMonth" name="expirationMonth" value={formData.expirationMonth} onChange={handleInputChange} placeholder='例) 01'/*required*/ /></td>
              </tr>

              <tr>
                <td><label htmlFor="expirationYear">有効期限（年）</label></td>
                <td><input type="text" id="expirationYear" name="expirationYear" value={formData.expirationYear} onChange={handleInputChange} placeholder='例) 25'/*required */ /></td>
              </tr>

              <tr>
                <td><label htmlFor='cvv'>CVV</label></td>
                <td><input type='text' id='cvv' name='cvv' value={formData.cvv} onChange={handleInputChange} placeholder='例) 123'/*required*/ /></td>
              </tr>
            </tbody>
          </table>
          {/* <button type="submit">確認して次に進む</button> */}
        </form>
      </div>
    </div>
  )
}

export default CreditCard

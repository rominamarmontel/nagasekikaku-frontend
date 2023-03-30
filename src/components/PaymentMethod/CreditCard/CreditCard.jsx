import React, { useState } from 'react'
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
        <h3>3. Enter card informations</h3>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="cardHolder">Card Holder:</label></td>
              <td><input type="text" id="cardHolder" name="cardHolder" value={formData.cardHolder} onChange={handleInputChange} /*required*/ /></td>
            </tr>

            <tr>
              <td><label htmlFor='cardNumber'>Card Number:</label></td>
              <td><input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} /* required */ /></td>
            </tr>

            <tr>
              <td><label htmlFor="expirationMonth">Exp. Month:</label></td>
              <td><input type="text" id="expirationMonth" name="expirationMonth" value={formData.expirationMonth} onChange={handleInputChange} /*required*/ /></td>
            </tr>

            <tr>
              <td><label htmlFor="expirationYear">Exp. Year:</label></td>
              <td><input type="text" id="expirationYear" name="expirationYear" value={formData.expirationYear} onChange={handleInputChange} /*required */ /></td>
            </tr>

            <tr>
              <td><label htmlFor='cvv'>CVV:</label></td>
              <td><input type='text' id='cvv' value={formData.cvv} onChange={handleInputChange} /*required*/ /></td>
            </tr>
          </tbody>
        </table>

        {/* <button type="submit">Continue</button> */}
      </form>
    </div>
  )
}

export default CreditCard

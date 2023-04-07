import React, { useState } from 'react'
import Zenkaku2hankaku from '../../Zenkaku2hankaku/Zenkaku2hankaku';

function CreditCard(props) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    const formDataCopy = { ...formData };
    formDataCopy[name] = name === "cvv" || name === "cardNumber" || name === "expirationMonth" || name === "expirationYear" || name === "cardHolder"
      ? Zenkaku2hankaku(value)
      : value; // valueがカードのセキュリティーコードである場合は、Zenkaku2hankaku関数で変換する
    setFormData(formDataCopy);
  };

  function validateCreditCardForm(event) {
    event.preventDefault();
    const cardNumberRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const currentYear = currentDate.getFullYear().toString().slice(-2);

    if (
      formData.cardNumber.length === 16 &&
      formData.cardNumber !== "" &&
      cardNumberRegex.test(formData.cardNumber) &&
      formData.cardHolder !== "" &&
      formData.expirationMonth.length === 2 &&
      formData.expirationMonth.length !== "" &&
      formData.expirationYear.length === 2 &&
      formData.expirationYear.length !== "" &&
      formData.cvv.length === 3 &&
      formData.cvv !== "" &&
      cvvRegex.test(formData.cvv)
    ) {
      props.onOrderSubmit();
    } else {
      if (formData.cardNumber.length !== 16) {
        alert('カード番号の桁数を確認してください');
      } else if (formData.expirationMonth.length !== 2 || formData.expirationYear.length !== 2) {
        alert('有効期限の月もしくは年の年号を正確に記してください。例) 8月の場合は"08"')
      } else if (formData.cvv.length !== 3) {
        alert('カード裏面に記載された3桁のCVVコードを入力してください');
      } else if (formData.expirationYear < currentYear) {
        alert('カードの有効期限が過ぎています。')
      } else if (formData.expirationYear === currentYear && formData.expirationMonth <= currentMonth) {
        alert('カードの有効期限が過ぎています。');
      }
      return;
    }
  }

  return (
    <div className='CreditCard'>
      <div className='process3'>
        <form className='credit-card-form' onSubmit={validateCreditCardForm} >
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
          <div className="form-card-btns">
            <button type='submit'>決済手続きをする</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreditCard
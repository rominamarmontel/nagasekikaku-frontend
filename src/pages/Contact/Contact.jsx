import React, { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './Contact.css'

const Contact = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "お問合せ", active: true },
  ];
  const [name, setName] = useState('')
  const [furigana, setFurigana] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [question, setQuestion] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className='Contact'>
        <div className='container'>
          <section className='company-profile'>
            <h2>会社概要</h2>
            <table>
              <tbody>
                <tr>
                  <td>会社名</td>
                  <td>歓楽宝斎 (かんらくほうさい)</td>
                </tr>
                <tr>
                  <td>住所</td>
                  <td>〒123-4567  東京都千代田区飯田橋X-X-X</td>
                </tr>
                <tr>
                  <td>代表者</td>
                  <td>XXX</td>
                </tr>
                <tr>
                  <td>設立</td>
                  <td>2023年10月30日
                  </td>
                </tr>
                <tr>
                  <td>電話番号</td>
                  <td>03-1234-5678</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className='contact-form'>
            <div className='contact-form-text'>
              <h2>お問合せ</h2>
              <p>商品について、お見積りのご相談など各種お問い合わせは<br />以下のお問い合せフォームにご記入いただき、送信ください。</p>
            </div>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td><label htmlFor='name'>お名前</label></td>
                    <td><input type="text" className='name' id='name' name='name' placeholder='' onChange={(event) => setName(event.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='furigana'>フリガナ</label></td>
                    <td><input type='text' className='furigana' id='furigana' name='furigana' placeholder='' onChange={(event) => setFurigana(event.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='email'>メールアドレス</label></td><td><input type='text' className='email' id='email' name='email' placeholder='' onChange={(event) => setEmail(event.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='tel'>電話番号</label></td>
                    <td><input type='text' className='tel' name='tel' placeholder='' onChange={(event) => setTel(event.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='question'>お問合せ</label></td>
                    <td><textarea
                      type="text"
                      value={question}
                      id="question"
                      name='question'
                      cols="46"
                      rows="10"
                      onChange={(event) =>
                        setQuestion(event.target.value)
                      }
                    /></td>
                  </tr>
                </tbody>
              </table>
              <div className='toriatsukai'>
                <h3>個人情報の取り扱いについて</h3>
                <p>ご記入いただいた個人情報（お名前やご連絡先）は、歓楽宝斎で保管し、結果の分析および、ご案内以外では利用いたしません。<br />
                  また情報の開示および、第三者への提供は行いません。</p>
              </div>
              <div>{message}</div>
              <div className='send-btns'>
                <button>送信する</button>
              </div>
            </form>
          </section>
        </div>
      </div >

    </>
  )
}

export default Contact
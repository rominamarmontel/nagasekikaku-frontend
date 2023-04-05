import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './FormEditProfile.css'
import myApi from '../../../service/service'
import Zenkaku2hankaku from '../../../components/Zenkaku2hankaku/Zenkaku2hankaku';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const EditInformation = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "アカウントページ", link: "/profile" },
    { label: "プロフィール編集", active: true },
  ];
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [message, setMessage] = useState('')


  const handleUsernameChange = (event) => {
    setUsername(Zenkaku2hankaku(event.target.value))
  }
  const handleEmailChange = (event) => {
    setEmail(Zenkaku2hankaku(event.target.value))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newProfile = { username, email }
    try {
      const response = await myApi.patch('/user/edit', newProfile)
      setUser(response.data)
      navigate('/profile')
    } catch (error) {
      console.log(error)
      setMessage('An error occurred while saving changes')
    }
  }

  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className='FormEditProfile'>
        <div className='title'>
          <h2>プロフィールの編集</h2>
        </div>
        <div className='container'>
          <form onSubmit={handleSubmit} action=''>
            <div className='form-box'>
              <div className='form-box-child'>
                <div>
                  <label htmlFor='username'>お名前</label>
                  <input type="text" value={username} name='username' autoComplete='current-username' id='username' onChange={handleUsernameChange} placeholder='' />
                </div>
                <div>
                  <label htmlFor='email'>メールアドレス</label>
                  <input type="text" value={email} name='email' id='email' autoComplete='current-email' onChange={handleEmailChange} placeholder='' />
                </div>
              </div>
              <div className='save-btns'>
                <button>保存</button>
                <Link to='/profile' className='cancel'>キャンセル</Link>
              </div>
            </div>
          </form>
          <div>{message}</div>
        </div>
      </div>
    </>
  )
}

export default EditInformation
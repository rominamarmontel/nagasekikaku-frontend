import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './FormEditProfile.css'
import myApi from '../../../service/service'


const EditInformation = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [message, setMessage] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
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
    <div className='FormEditProfile'>
      <h2>プロフィールの編集</h2>
      <form onSubmit={handleSubmit} action=''>
        <label htmlFor='username'>お名前</label>
        <input type="text" value={username} name='username' id='username' onChange={handleUsernameChange} placeholder='' />

        <label htmlFor='email'>メールアドレス</label>
        <input type="text" value={email} name='email' id='email' onChange={handleEmailChange} placeholder='' />

        <button>保存</button>
        <Link to='/profile'>キャンセル</Link>
      </form>
      <div>{message}</div>
    </div>
  )
}

export default EditInformation
import React, { useState } from 'react'
import myApi from '../../service/service'
import './DeleteProfileButton.css'

const DeleteProfileButton = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleDeleteProfile = async () => {
    try {
      await myApi.delete('/user/delete', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Password: password,
        },
      })

      // User deleted, logout and redirect to home page
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      setError('Incorrect password, please try again')
    }
  }

  return (
    <div className='DeleteProfileButton'>
      {error && <p className='error-dlt'>{error}</p>}
      
      <div className='delete-form'>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button onClick={handleDeleteProfile}> Delete Account</button>
      </div>
      
      <p className='italic'>enter your pasword to delete your account</p>
    </div>
  )
}

export default DeleteProfileButton

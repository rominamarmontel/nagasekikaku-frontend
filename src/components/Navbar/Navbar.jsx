import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const { user, authenticateUser, removeToken } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleClick() {
    removeToken()
    authenticateUser()
    navigate('/')

  }

  return (
    <div className='Navbar'>

      <NavLink to="/"><img src='/images/logo3.png' alt='logo_yoko' width={600} /></NavLink>

      <NavLink to="/store">オンラインストア</NavLink>
      <NavLink to="/topic">お知らせ</NavLink>
      <NavLink to="/about">歓楽宝斎とは</NavLink>
      <NavLink to="/contact">お問合せ</NavLink>
      {!user ? (
        <>
          <NavLink to="/login">ログイン</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/profile">プロフィール</NavLink>
          <NavLink to='/cart'>
            <lord-icon src="https://cdn.lordicon.com/udbbfuld.json" trigger="hover" colors="primary:#000000" state="hover"></lord-icon>
          </NavLink>
          <button onClick={handleClick} className='logout'>ログアウト</button>
        </>
      )}

    </div>



  )
}

export default Navbar
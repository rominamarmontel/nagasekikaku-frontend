import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BiCart } from "react-icons/bi";
import { MdAccountCircle } from 'react-icons/md'
import { RiAdminLine } from 'react-icons/ri'

const Navbar = () => {
  const { user, authenticateUser, removeToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [scrollNavbar, setScrollNavbar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrollNavbar(scrollTop > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClasses = `ScrollNavbar ${showNavbar ? 'ScrollNavbar--show' : ''}`;

  function handleClick() {
    removeToken()
    authenticateUser()
    navigate('/')
  }

  return (
    <>
      <div className="Navbar">
        <NavLink to="/"><img src='https://res.cloudinary.com/dyu65fpse/image/upload/v1681581180/logo3_jrxza9.png' alt='logo_yoko' width={600} /></NavLink>
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
            {user && user.isAdmin && <NavLink to={'/admin/top'}><RiAdminLine className='account-icon' /></NavLink>}
            <NavLink to="/profile"><MdAccountCircle className='account-icon' /></NavLink>
            <NavLink to='/cart'>
              <BiCart className='cart-icon' />
            </NavLink>
            <button onClick={handleClick} className='logout'>ログアウト</button>
          </>
        )}
      </div>
      {scrollNavbar &&
        <div className="ScrollNavbar">
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
              {user && user.isAdmin && <NavLink to={'/admin/top'}><RiAdminLine className='account-icon' /></NavLink>}
              <NavLink to="/profile"><MdAccountCircle className='account-icon' /></NavLink>
              <NavLink to='/cart'>
                <BiCart className='cart-icon' />
              </NavLink>
              <button onClick={handleClick} className='logout'>ログアウト</button>
            </>
          )}
        </div>
      }
    </>
  )
}

export default Navbar
import React from 'react'
import './Layout.css'
import { Outlet, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Layout = () => {
  return (
    <>
      <div className='wrap'>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default Layout

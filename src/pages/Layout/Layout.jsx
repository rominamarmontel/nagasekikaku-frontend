import React from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Content from '../../components/Content/Content'

const Layout = () => {
  return (
    <>
      <div className='wrap'>
        <header>
          <Navbar />
        </header>
        <main>
          <Content />
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

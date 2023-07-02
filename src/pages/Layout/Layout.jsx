import React, { Suspense } from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Spinner from '../../components/Spinner/Spinner'


const Layout = () => {
  return (
    <>
      <div className='wrap'>
        <header>
          <Navbar />
        </header>
        <main>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default Layout

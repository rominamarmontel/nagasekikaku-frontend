import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'

const IsLoggedOut = () => {
  const { isLoading, user } = useContext(AuthContext)

  if (isLoading) {
    return <Spinner />
  }

  if (user) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default IsLoggedOut
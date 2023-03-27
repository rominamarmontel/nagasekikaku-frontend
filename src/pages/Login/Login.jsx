import { useState, useContext } from 'react'
import myApi from './../../service/service'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { storeToken, authenticateUser } = useContext(AuthContext)

  async function handleSubmit(event) {
    event.preventDefault()
    const userToLogin = { email, password }

    try {
      const response = await myApi.post('/auth/login', userToLogin)
      storeToken(response.data.token)
      await authenticateUser()
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <section id='Login'>
      <form onSubmit={handleSubmit}>
        <div className='Login'>
          <h2>ログイン</h2>
          <div className='email'>
            <label htmlFor="email">
              メールアドレス:&nbsp;
              <input
                type="text"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </div>
          <div className='password'>
            <label htmlFor="password">
              パスワード:&nbsp;
              <input
                type="password"
                id="password" autoComplete="on"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error.length > 0 && <p className="error">{error}</p>}
          </div>
          <div className='btn-login'>
            <button>ログイン</button>
          </div>
          <div><h4>初めての方はこちらから会員登録してください。<Link to='/Signup'> 会員登録へ</Link></h4></div>
        </div>
      </form>
    </section>
  )
}

export default Login
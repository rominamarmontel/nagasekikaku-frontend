import { useState } from 'react'
import myApi from '../../service/service'
import { useNavigate, Link } from 'react-router-dom'
import './Signup.css'

const Signup = () => {
  const [{ username, email, password }, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleChange(event) {
    const updatedState = {
      username,
      email,
      password,
      [event.target.id]: event.target.value,
    }
    setFormData(updatedState)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const userToCreate = { username, email, password }

    try {
      const response = await myApi.post('/auth/signup', userToCreate)
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (error) {
      console.error(error.response.data)
      setError(error.response.data.message)
    }
  }

  return (
    <section id='Signup'>
      <form onSubmit={handleSubmit}>
        <div className='Signup'>
          <h2>会員登録</h2>
          <div className='username'>
            <label htmlFor="username">
              お名前:&nbsp;
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='email'>
            <label htmlFor="email">
              メールアドレス:&nbsp;
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='password'>
            <label htmlFor="password">
              パスワード:&nbsp;
              <input
                type="password"
                id="password"
                autoComplete="on"
                value={password}
                onChange={handleChange}
              />
            </label>
            {error.length > 0 && <p className="error">{error}</p>}
          </div>
          <div className='btn-signup'>
            <button>登録する</button>
          </div>
          <div>
            <h4>すでに登録されている方は<br />こちらから
              <Link to='/Login'> ログイン</Link>してください</h4></div>
        </div>
      </form>
    </section>
  )
}

export default Signup
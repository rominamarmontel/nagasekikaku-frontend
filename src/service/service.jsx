import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const myApi = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
myApi.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token')
    // console.log(localStorage)
    if (token) request.headers.Authorization = `Bearer ${token}`
    // console.log(request.headers)
    return request
  },
  (error) => console.error
)

export default myApi

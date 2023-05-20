import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const myApi = axios.create({
  baseURL: BACKEND_URL,
})

myApi.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    if (request.data instanceof FormData) {
      request.headers['Content-Type'] = 'multipart/form-data'
    } else {
      request.headers['Content-Type'] = 'application/json'
    }
    return request
  },
  (error) => console.error
)

export default myApi
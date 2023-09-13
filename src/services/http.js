import axios from 'axios'

const http = axios.create({
  baseURL: 'http://192.168.146.99:8000/api'
})

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default http
import http from '@/services/http'

export default {
  async login(email, password) {
    try {
      const response = await http.post('/login', { email, password })
      const token = response.data
      // const token = response.data.token
      return token
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async logout() {
    try {
      const response = await http.post('/logout')
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async getUser() {
    try {
      const response = await http.get('/me')
      const { status, data: user } = response
      return { status, user }
    } catch (error) {
      return !(error.status === 401)
      // console.log(error)
      // throw error
      // return false
    }
  }
}

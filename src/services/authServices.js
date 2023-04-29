import http from '@/services/http'

export default {
  async login(email, password) {
    try {
      const response = await http.post('/login', { email, password })
      const token = response.data
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
      console.log(error)
      throw error
    }
  }
}

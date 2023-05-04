import http from '@/services/http'

export default {
  async login(username, password) {
    try {
      const response = await http.post('/login', { username, password })
      const token = response.data.token
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

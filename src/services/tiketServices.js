import http from '@/services/http'

export default {
  async getTiket(id) {
    try {
      const response = await http.get(`/tiket/${id}`)
      const data = response.data
      // const token = response.data.token
      return data
    } catch (error) {
      // throw errorf 
    }
  }
}

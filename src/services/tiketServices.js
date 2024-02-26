import http from '@/services/http'

export default {
  async getTiket(id) {
    try {
      const response = await http.get(`/tiket/${id}`)
      const data = response
      // const token = response.data.token
      return data
    } catch (error) {
      // throw errorf 
    }
  },
  async getAllTiket({ page, itemsPerPage, sortBy, search }) {
    try {
      const response = await http.get(`/tiket`, { params: { page: page, search: search } })
      const data = response
      // const token = response.data.token
      return data
    } catch (error) {
      // throw errorf 
    }
  },
  async getPib(id) {
    const response = await http.get(`/pib/${id}`)
    const data = response.data
    return data
  },
  async getPeb(id) {
    const response = await http.get(`/peb/${id}`)
    const data = response.data
    return data
  },

}

import axios from 'axios'

const API_URL = 'https://api.example.com'

export default {
  getUsers() {
    return axios.get(`${API_URL}/users`)
  },

  getUserById(id) {
    return axios.get(`${API_URL}/users/${id}`)
  },

  updateUser(id, data) {
    return axios.put(`${API_URL}/users/${id}`, data)
  },

  deleteUser(id) {
    return axios.delete(`${API_URL}/users/${id}`)
  }
}

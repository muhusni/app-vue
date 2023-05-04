import { defineStore } from 'pinia'
import authServices from '@/services/authServices'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    isTokenValid: false,
  }),
  actions: {
    async login(email, password) {
      try {
        this.isLoading = true
        const token = await authServices.login(email, password)
        // this.user = user
        this.token = token
        localStorage.setItem('token', token)
        this.isLoading = false
        return this.checkTokenValidity()
        // return true
      } catch (error) {
        console.log(error)
        this.isLoading = false
        return false
      }
    },
    async logout() {
        this.isLoading = true
        const response = await authServices.logout()
      if (response.status === 200) {
        localStorage.removeItem('token')
        this.token = null
        this.isTokenValid = false
        this.isLoading = false
        return true
      } else {
        return false
      }
    },
    async checkTokenValidity() {
      if (this.token !== null) {
        // check the cached token validity status
        if (this.isTokenValid) {
          // token is valid, allow access to protected routes
          return true
        }

        // make a request to the backend server to check the token validity
        try {
          const response = await authServices.getUser()
          if (response.status === 200) {
            // token is valid, set the cached token validity status to true
            this.isTokenValid = true
            return true
          } else {
            // token is invalid, log the user out and redirect to login page
            // this.logout()
            router.push('/login')
            return false
          }
        } catch (error) {
          console.error(error)
          // failed to check token validity, redirect to login page
          // this.logout()
          router.push('/login')
          return false
        }
      } else {
        // if the user is not authenticated or there is no token, allow access to unprotected routes
        return false
      }
    },
  }
})

import { defineStore } from 'pinia'
import authServices from '@/services/authServices'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        isLoading: true
    }),
    actions: {
        async login (email, password) {
            try {
                this.isLoading = true
                const token = await authServices.login(email, password)
                // this.user = user
                this.token = token
                localStorage.setItem('token', token)
                this.isAuthenticated = true
                this.isLoading = false
                return true
            } catch (error) {
                console.log(error)
                this.isLoading = false
                return false
            }
        },
        async logout () {
            const response = await authServices.logout()
            if (response.status === 200) {
                this.isAuthenticated = false
                this.token = null
                return true
            } else {
                return false
            }
        }
    }
})

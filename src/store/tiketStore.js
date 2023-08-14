import { defineStore } from 'pinia'
import tiketServices from '@/services/tiketServices'

export const useTiketStore = defineStore('tiket', {
  state: () => ({
    tiket: []
  }),
  actions: {
    async getTiket(id) {
      try {
        const tiket = await tiketServices.getTiket(id)
        this.tiket = tiket
        return tiket
      } catch (error) {
        console.log('tsss')
      }
    }
  }
})

import { defineStore } from 'pinia'
import tiketServices from '@/services/tiketServices'

export const useTiketStore = defineStore('tiket', {
  state: () => ({
    tiket: [],
    listAju: [],
    ajuFinal: [],
    selectedAju: []
  }),
  actions: {
    async getTiket(id) {
      // try {
      const tiket = await tiketServices.getTiket(id)
      this.tiket = tiket.data
      this.listAju.length = 0
      this.selectedAju.length = 0
      return tiket
      // } catch (error) {
      //   return error
      // }
    },
    async getPib(id) {
      try {
        const pib = await tiketServices.getPib(id)
        this.listAju.push({...pib, aju: id})
        return pib
      } catch (error) {
        console.log('tsss')
      }
    },
    async getPeb(id) {
      try {
        const peb = await tiketServices.getPeb(id)
        this.listAju.push({...peb, aju: id})
        return peb
      } catch (error) {
        console.log('tsss')
      }
    },
    // const cekDokumen = (kategori) => kategori === 6 || kategori === 18 || kategori === 24 ? 'PIB' : (kategori === 7 || kategori === 20 || kategori === 25 ? 'PEB' : '')
    cekDokumen (kategori) {
      return kategori === 6 || kategori === 18 || kategori === 24 ? 'PIB' : (kategori === 7 || kategori === 20 || kategori === 25 ? 'PEB' : '')
    }
  }
})

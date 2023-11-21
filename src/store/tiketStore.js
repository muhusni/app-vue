import { defineStore } from 'pinia'
import tiketServices from '@/services/tiketServices'
import axios from 'axios'
import { useCeisa40Store } from './ceisa40Store'


export const useTiketStore = defineStore('tiket', {
  state: () => ({
    tiket: [],
    listAju: [],
    ajuFinal: [],
    selectedAju: [],
    noTiketIkc: ''
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
    },

    async laporIkc (message, judulIkc) {
      const { selectedAju: AjuCeisa40 } = useCeisa40Store();
      if (!this.ajuFinal.length > 0) return null;
      let judul
      // let no_aju = this.ajuFinal.map(({car}) => car);
      let dokumen = this.cekDokumen(this.tiket.categoryid);
      if (judulIkc === '') {
        judul = this.selectedAju.length > 0 ? this.selectedAju[0].status : AjuCeisa40[0].namaProses
      } else {
        judul = judulIkc;
      }
      const data = {
        // no_aju: no_aju,
        jenis_dokumen: dokumen,
        judul: `${dokumen} ${judul}`,
        uraian: message
      };
      // console.log(data)
      const tiket = await axios.post('http://192.168.146.99:5000/lapor', data)
      return tiket
    },

    async laporIkcNew(data) {
      const tiket = await axios.post('http://192.168.146.99:5000/laporikc', data)
      return tiket
    },

    clearData () {
      this.listAju.length = 0
      this.selectedAju.length = 0
    }
  }
})

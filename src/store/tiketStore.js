import { defineStore } from 'pinia'
import tiketServices from '@/services/tiketServices'
import axios from 'axios'
import { useCeisa40Store } from './ceisa40Store'


export const useTiketStore = defineStore('tiket', {
  state: () => ({
    tiket: [],
    tiketAll: [],
    totalTiketItems: 0,
    listAju: [],
    ajuFinal: [],
    selectedAju: [],
    noTiketIkc: '',
    listBarkir: []
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
    async getAllTiket({ page, itemsPerPage, sortBy, search }) {
      // try {
      this.tiketAll.length = 0
      const tiket = await tiketServices.getAllTiket({ page, itemsPerPage, sortBy, search })
      this.tiketAll = tiket.data
      this.totalTiketItems = tiket.data.total
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
      if (kategori === 13) return 'Barkir CN/PIBK'
      if (kategori === 6 || kategori === 18 || kategori === 24) return 'PIB'
      if (kategori === 7 || kategori === 20 || kategori === 25) return 'PEB'
      return null
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

    async cekBarkir(data) {
      const barkir = await axios.post('http://192.168.146.99:5000/barkir', { "AWB" : data})
      this.listBarkir = barkir.data
      return barkir
    },

    clearData () {
      this.listAju.length = 0
      this.selectedAju.length = 0
      this.listBarkir.length = 0
    }
  }
})

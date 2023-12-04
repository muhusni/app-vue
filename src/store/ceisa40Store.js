import { defineStore } from 'pinia'
import http from '@/services/http'

export const useCeisa40Store = defineStore('ceisa40', {
  state: () => ({
    dokCeisa40: [],
    selectedAju: [],
    tabRespon: false,
    nomorAjuCurrent: '',
    idHeaderCurrent: '',
    riwayatRespon: [],
    riwayatStatus: [],
  }),
  getters: {
    getPenerimaanDokumen (state) {
      return state.dokCeisa40.filter((aju) => aju.namaProses === 'LNSW - Penerimaan Dokumen');
    },
    getDokumenPerStatus: (state) => (namaProses, jenisDok) => {
      const dok = state.dokCeisa40.filter((aju) => aju.namaDokumen === jenisDok);
      return dok.filter((aju) => aju.namaProses === namaProses);
    },
    getJenisDokumen: (state) => {
      return [...new Set(state.dokCeisa40.map((aju) => aju.namaDokumen))];
    },
    getStatusDokumen: (state) => (jenisDok) => {
      const dok = state.dokCeisa40.filter((aju) => aju.namaDokumen === jenisDok);
      return [...new Set(dok.map((aju) => aju.namaProses))];
    },
  },
  actions: {
    async getDokumenCeisa40(id) {
      const dokCeisa40 = await http.get(`/ceisa40/dokumen/${id}`)
      this.dokCeisa40.push(...dokCeisa40.data.data)
      return dokCeisa40
    },
    async getDokumenCeisa40PreRespon() {
      this.dokCeisa40.length = 0
      const dokCeisa40 = await http.get(`/ceisa40/dokumen/v1`)
      this.dokCeisa40.push(...dokCeisa40.data.data.filter((aju) => (aju.nomorAju.substring(16, 18) === (new Date().getMonth()+1).toString()) && aju.nomorAju.substring(12, 16) !== '2022'))
      return dokCeisa40
    },
    async getPdfCeisa40(idHeader, idRespon) {
      const pdf = await http.get(`/ceisa40/download/${idHeader}/${idRespon}`)
      return pdf.data
    },
    async getRiwayatRespon(idHeader, nomorAju) {
      this.riwayatRespon.length = 0
      const riwayatRespon = await http.get(`ceisa40/riwayat/${idHeader}/${nomorAju}`)
      this.riwayatRespon.push(...riwayatRespon.data.data)
      return riwayatRespon.data
    },
    async getRiwayatStatus(idHeader) {
      this.riwayatStatus.length = 0
      const riwayatStatus = await http.get(`ceisa40/riwayat/status/${idHeader}`)
      this.riwayatStatus.push(...riwayatStatus.data.data)
      return riwayatStatus.data
    },
    async kirimUlangINSW(idHeader) {
      const sendInsw = await http.get(`ceisa40/insw/kirim/${idHeader}`)
      return sendInsw
    },
    async sendAllINSW() {
      this.selectedAju.forEach((aju) => {
        if (aju.kodeProses === '105') this.kirimUlangINSW(aju.idHeader);
      });

      return true
    },
    async getJumlahDokumen(kodeDokumen) {
      const jumlahDokumen = await http.get(`ceisa40/dokumen/jumlah/${kodeDokumen}`);
      return jumlahDokumen.data;
    },
    // const cekDokumen = (kategori) => kategori === 6 || kategori === 18 || kategori === 24 ? 'PIB' : (kategori === 7 || kategori === 20 || kategori === 25 ? 'PEB' : '')
    clearData () {
      this.dokCeisa40.length = 0
      this.selectedAju.length = 0
      this.riwayatRespon.length = 0
      this.riwayatStatus.length = 0
    },
  }
})

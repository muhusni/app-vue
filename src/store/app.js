// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    drawer: null,
    userData: {},
    snackbar: {
      isActive: false,
      text: '',
      color: ''
    },
    isLoading: false
    //
  }),
  actions: {
    snackbarAct(bar, text, color) {
      this.snackbar.isActive = !this.snackbar.isActive
      this.snackbar.text = text
      this.snackbar.color = color
    }
  }
})

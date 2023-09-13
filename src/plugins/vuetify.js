/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDataTable } from 'vuetify/labs/VDataTable'

// Composables
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    // defaultTheme: 'dark',
    // themes: {
    //   light: {
    //     background: '#FFF3E0', // Not automatically applied #E8F5E9
    //     primary: '#182047',
    //     secondary: '#ebb633'
    //     // primary: '#66BB6A'
    //   },
    //   dark: {
    //     // primary: colors.shades,
    //     primary: '#182047',
    //     secondary: '#ebb633',
    //     red: '#D32F2F',
    //     error: '#D32F2F'
    //   }
    // },
    // dark: false
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  components: {
    VDataTable,
  },
})

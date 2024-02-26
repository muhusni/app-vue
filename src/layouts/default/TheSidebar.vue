<template>
  <v-list density="compact" nav>
    <v-list-item v-for="m in menu" :key="m.title" :prepend-icon="m.icon" :title="m.title" :value="m.title"
      :to="m.to"></v-list-item>
  </v-list>
</template>

<script setup>
import { reactive } from "vue";


const menu = reactive([
  { title: "Home", icon: "mdi-home", to: "/home" },
  { title: "Tiket BC Soetta", icon: "mdi-ticket-account", to: "/tiket" },
  { title: "INSW", icon: "mdi-search-web", to: "/insw" },
  { title: "CEISA 4.0 Pre-Respon", icon: "mdi-magnify", to: "/ceisa40prerespon" },
  { title: "Browse CEISA 4.0", icon: "mdi-file-search-outline", to: "/ceisa40" },
  { title: "Dashboard", icon: "mdi-chart-bar", to: "/dashboard" },
  { title: "Tiket by Tiket IKC", icon: "mdi-magnify", to: "/tiket-ikc" },
  { title: "Layanan Data Duktek", icon: "mdi-database-arrow-down", to: "/layanan-data" }
])

</script>

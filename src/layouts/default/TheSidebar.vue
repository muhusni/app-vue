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
  { title: "Dashboard", icon: "mdi-domain", to: "/dashboard" }
])

</script>

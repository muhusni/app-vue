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
  { title: "My Folder", icon: "mdi-folder", to: "/folder" },
  { title: "User Management", icon: "mdi-account-multiple", to: "/user" },
  { title: "Tiket BC Soetta", icon: "mdi-ticket-account", to: "/tiket" }
])

</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="AppStore.drawer">
      <!--  -->
      <!-- <v-list>
        <v-list-item title="APP VUE" class="d-flex justify-center">
        </v-list-item>
      </v-list> -->
        <v-img :width="135" cover class="d-flex justify-center" src="@/assets/app-vue-logo.png"></v-img>
      <v-divider></v-divider>
      <Sidebar />
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-app-bar-nav-icon @click="AppStore.drawer = !AppStore.drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!AppStore.drawer">App Vue</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn :icon="theme.global.current.value.dark ? 'mdi-brightness-3' : 'mdi-brightness-5'"
          @click="toggleTheme"></v-btn>
        <Dropdown />
      </template>
    </v-app-bar>

    <v-main>
      <div class="pa-5">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { onMounted } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";
import Sidebar from "./TheSidebar.vue";

// components
import Dropdown from "./TheDropdown.vue";

const theme = useTheme()

// at start

onMounted(() => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme !== null) {
    theme.global.name.value = savedTheme
  }
})
const toggleTheme = () => {
  const currentTheme = theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem("theme", currentTheme)
  return currentTheme
}
const AppStore = useAppStore()
</script>

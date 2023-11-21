<template>
  <v-app id="inspire" :style="{background: theme.themes.value[theme.global.name.value].background}">
    <v-navigation-drawer v-model="AppStore.drawer">
      <v-img :width="135" cover class="mx-auto" src="@/assets/app-vue-logo.png"></v-img>
      <v-divider></v-divider>
      <TheSidebar />
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-app-bar-nav-icon @click="AppStore.drawer = !AppStore.drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!AppStore.drawer">App Duktek</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <TheDropdown />
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
import TheSidebar from "./TheSidebar.vue";
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme();
// components
import TheDropdown from "./TheDropdown.vue";
const AppStore = useAppStore()

console.log(theme.themes.value[theme.global.name.value].background)
// theme.global.name.value
</script>

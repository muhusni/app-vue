<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="AppStore.drawer">
      <!--  -->
      <!-- <v-list>
        <v-list-item title="APP VUE" class="d-flex justify-center">
        </v-list-item>
      </v-list> -->
      <v-img :width="135" cover class="mx-auto" src="@/assets/app-vue-logo.png"></v-img>
      <v-divider></v-divider>
      <TheSidebar />
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-app-bar-nav-icon @click="AppStore.drawer = !AppStore.drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!AppStore.drawer">App Vue</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <!-- <v-btn :icon="theme.global.current.value.dark ? 'mdi-brightness-3' : 'mdi-brightness-5'"
          @click="toggleTheme"></v-btn> -->
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

// components
import TheDropdown from "./TheDropdown.vue";
const AppStore = useAppStore()
</script>

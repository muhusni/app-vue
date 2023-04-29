<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item density="compact">
        <v-list-item
          prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36zs1WTph95UP97_9HyIt1Q1Sd-QYJ20O8WIIICNjvQ&s"
          title="Muhamad Husni" subtitle="mu.husni@yahoo.com">
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item value="toggleDarkMode">
          <v-switch @click="toggleTheme" color="primary" v-model="VarSwitch" hide-details inset
            label="Dark Theme"></v-switch>
        </v-list-item>
        <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout" @click="logoutHandle">
          <template v-slot:append>
            <v-progress-circular v-if="isLoading" :indeterminate="isLoading" size="24" class="ms-2"></v-progress-circular>
          </template>
        </v-list-item>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useUserStore } from "@/store/userStore"
import { useRouter } from "vue-router"
import { ref } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";
import { storeToRefs } from "pinia";


const { logout } = useUserStore()
const { isLoading } = storeToRefs(useUserStore())
const router = useRouter()

const theme = useTheme()
// const currentTheme = theme.global.name.value = theme.global.current.value.dark ? true : false
const VarSwitch = ref(theme.global.current.value.dark ? true : false)

const toggleTheme = () => {
  const currentTheme = theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem("theme", currentTheme)
  return currentTheme
}

const logoutHandle = async () => {
  const isLogout = await logout()
  if (isLogout) router.push('/login')
}
</script>

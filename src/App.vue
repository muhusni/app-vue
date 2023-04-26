<template>
  <router-view />
</template>

<script setup>
import { useTheme } from 'vuetify/lib/framework.mjs';
import { onMounted } from 'vue';
//
const theme = useTheme()
onMounted(() => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme !== null) {
    theme.global.name.value = savedTheme
  }
})
</script>

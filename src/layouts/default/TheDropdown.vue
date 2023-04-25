<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item density="compact">
        <v-list>
          <v-list-item
            prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36zs1WTph95UP97_9HyIt1Q1Sd-QYJ20O8WIIICNjvQ&s"
            title="Muhamad Husni" subtitle="mu.husni@yahoo.com">
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-logout-variant" title="Logout" value="logout" to="/login"></v-list-item>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

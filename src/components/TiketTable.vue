<template>
    <v-card class="card-left bgreen mb-5" elevation="5"
        :disabled="TiketStore.tiketAll.length < 1" :loading="TiketStore.tiketAll.length < 1">
        <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
            Tiket by Tiket IKC

            <v-spacer></v-spacer>

            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line
                flat hide-details variant="solo-filled"></v-text-field>
        </v-card-title>
        <v-card-text>
            <!-- <v-data-table-server :headers="headers" hover :items="TiketStore.tiketAll.data"
                :total-items="TiketStore.totalTiketItems" class="elevation-1">
            </v-data-table-server> -->
            <v-data-table-server :search="search" v-model:items-per-page="TiketStore.tiketAll.per_page" :headers="headers"
                :items-length="TiketStore.totalTiketItems" :items="TiketStore.tiketAll.data" item-value="name"
                @update:options="TiketStore.getAllTiket">
            </v-data-table-server>
        </v-card-text>
    </v-card>
</template>
  
<script setup>
import { useTiketStore } from '@/store/tiketStore'
import { storeToRefs } from "pinia";
import { ref } from 'vue';

const TiketStore = useTiketStore();
const search = ref('');
const headers = [
    { title: '#', key: 'ID' },
    { title: 'Title', key: 'title' },
    { title: 'Category', key: 'ticket_category.name' },
    { title: 'Status', key: 'ticket_status.name' },
    { title: 'Tiket IKC', key: 'ticket_IKC' }
];

</script>
  
<template>
    <v-card title="Tiket by Tiket IKC" class="card-left bgreen mb-5" elevation="5" :disabled="TiketStore.tiketAll.length < 1"
        :loading="TiketStore.tiketAll.length < 1">
        <v-card-text oad>
            <!-- <v-data-table-server :headers="headers" hover :items="TiketStore.tiketAll.data"
                :total-items="TiketStore.totalTiketItems" class="elevation-1">
            </v-data-table-server> -->
            <v-data-table-server v-model:items-per-page="TiketStore.tiketAll.per_page" :headers="headers" :items-length="TiketStore.totalTiketItems"
                :items="TiketStore.tiketAll.data" item-value="name" 
                @update:options="TiketStore.getAllTiket"></v-data-table-server>
        </v-card-text>
    </v-card>
</template>
  
<script setup>
import { useTiketStore } from '@/store/tiketStore'
import { storeToRefs } from "pinia";

const TiketStore = useTiketStore();
const headers = [
    { title: '#', key: 'ID' },
    { title: 'Title', key: 'title' },
    { title: 'Category', key: 'ticket_category.name' },
    { title: 'Status', key: 'ticket_status.name' },
    { title: 'Tiket IKC', key: 'ticket_IKC' }
];

</script>
  
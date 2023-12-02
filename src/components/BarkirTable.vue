<template>
  <v-card title="Barkir" class="card-left bgreen mb-5" elevation="5" :disabled="TiketStore.listBarkir.length < 1" :loading="TiketStore.listBarkir.length < 1">
      <v-card-text oad>
          <v-data-table v-model="selectedAju" :headers="headers" show-select return-object hover :items="TiketStore.listBarkir"
              class="elevation-1">
          </v-data-table>
      </v-card-text>
  </v-card>
</template>

<script setup>
import { useTiketStore } from '@/store/tiketStore'
import { storeToRefs } from "pinia";

const TiketStore = useTiketStore();
const { listBarkir, selectedAju } = storeToRefs(TiketStore)
const headers = [
  { title: 'NOMOR BARANG', key: 'NOMOR BARANG' },
  { title: 'JENIS AJU', key: 'JENIS AJU' },
  { title: 'NAMA PEMBERITAHU', key: 'NAMA PEMBERITAHU' },
  { title: 'NAMA PENERIMA', key: 'NAMA PENERIMA' },
  { title: 'TGL HAWB', key: 'TGL HAWB' },
  { title: 'NAMA PDTT', key: 'NAMA PDTT' },
  { title: 'CURRENT STATUS', key: 'CURRENT STATUS' },
];

</script>

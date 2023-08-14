<template>
    <v-card title="Tiket BC Soetta" :loading="loading">
        <v-card-text >
            <v-row justify="center" class="mb-2">
                <v-col cols="6">
                    <v-text-field  density="compact" v-model="tiketId" class="" variant="outlined" label="Cari Nomor Tiket"
                        append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="cariTiket"></v-text-field>
                </v-col>
            </v-row>
            <v-card title="Detail Tiket" class="mb-5">
                <v-card-text>
                    <table>
                        <tr>
                            <td>Nomor Tiket</td>
                            <td>: {{  TiketStore.tiket.ID }}</td>
                        </tr>
                        <tr>
                            <td>Kategori</td>
                            <td>: {{ TiketStore.tiket.categoryid}}</td>
                        </tr>
                        <tr>
                            <td>Permasalahan</td>
                            <td>: <div v-html="TiketStore.tiket.body"></div></td>
                        </tr>
                        <tr>
                            <td>Jumlah Aju</td>
                            <td>: </td>
                        </tr>
                    </table>
                </v-card-text>
            </v-card>
            <v-card title="INSW">

            </v-card>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref } from 'vue'
import { useTiketStore } from '@/store/tiketStore'
import { reactive } from 'vue'
const loading = ref(false)
const tiketId = ref('')
const tiketData = ref([])
const TiketStore = useTiketStore()
const  cariTiket = async () => {
    await TiketStore.getTiket(tiketId.value)
}
</script>
  
<template>
    <v-card title="INSW" class="card-left bgreen mb-5" elevation="5">
        <v-card-text>
            <v-data-table v-model="selectedAju" :headers="headers" show-select return-object hover :items="ajuFinal"
                class="elevation-1">
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { watch } from 'vue';
import { useTiketStore } from '@/store/tiketStore'
import { storeToRefs } from "pinia";

const TiketStore = useTiketStore();
const { ajuFinal, selectedAju } = storeToRefs(TiketStore)
const headers = [
    { title: 'CAR', key: 'car' },
    { title: 'Kode Kantor', key: 'kd_kantor' },
    { title: 'Nama Perusahaan', key: 'nm_perusahaan' },
    { title: 'Nama PPJK', key: 'nm_ppjk' },
    { title: 'Status', key: 'status' },
    { title: 'Tgl. Respon', key: 'tgl_respon' },
];

watch(TiketStore.listAju, () => {
    ajuFinal.value = TiketStore.listAju.map((array) => {
        if (array.data.length !== 0) {
            return {
                car: array.data.data_header[array.data.data_header.length - 1].car,
                kd_kantor: array.data.data_header[array.data.data_header.length - 1].kd_kantor,
                nm_perusahaan: array.data.length !== 0 ? (TiketStore.cekDokumen(TiketStore.tiket.categoryid) === 'PIB' ?
                    array.data.data_header[array.data.data_header.length - 1].nm_importir :
                    array.data.data_header[array.data.data_header.length - 1].nm_exportir) : '',
                nm_ppjk: array.data.data_header[array.data.data_header.length - 1].ppjk,
                status: array.data.data_header[array.data.data_header.length - 1].status.replace(/<br>.+/g, ''),
                tgl_respon: array.data.data_header[array.data.data_header.length - 1].tgl_respon,
            }
        } else {
            return {
                car: array.aju,
                kd_kantor: "",
                nm_perusahaan: "",
                nm_ppjk: "",
                status: "Tidak ada di INSW",
                tgl_respon: "",
            };
        }
    })
}, { deep: true });
</script>
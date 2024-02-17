<template>
    <v-card class="card-left bgreen mb-5" elevation="5">
        <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
            CEISA 4.0

            <v-spacer></v-spacer>

            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line
                flat hide-details variant="solo-filled"></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table v-model:search="search" :items-per-page="page" v-model="selectedAju" :headers="headers" show-select return-object hover :items="dokCeisa40"
                class="elevation-1">
                <template v-slot:item.actions="{ item }">
                    <!-- <a
                        :href="`http://192.168.146.99:8000/api/ceisa40/download/${dokCeisa40[item.index].idHeader}/${dokCeisa40[item.index].idRespon}`">
                        <v-icon size="small" class="me-2">
                            mdi-download
                        </v-icon> Respon</a> -->
                    <!-- <a
                        :href="`http://192.168.146.99:8000/api/ceisa40/download/draf/${dokCeisa40[item.index].kodeDokumen}/${dokCeisa40[item.index].idHeader}`">
                        <v-icon size="small" class="me-2">
                            text-box-multiple-outline
                        </v-icon> Draf</a> -->
                    <v-chip-group color="blue">
                        <a v-if="dokCeisa40[item.index].idRespon !== null"
                            :href="`${app.defaults.baseURL}/ceisa40/download/${dokCeisa40[item.index].idHeader}/${dokCeisa40[item.index].idRespon}`"><v-chip>
                                <v-icon size="small" class="me-2">
                                    mdi-download
                                </v-icon> Respon</v-chip>
                        </a>
                        <a
                            :href="`${app.defaults.baseURL}/ceisa40/download/draf/${dokCeisa40[item.index].kodeDokumen}/${dokCeisa40[item.index].idHeader}`"><v-chip>
                                <v-icon size="small" class="me-2">
                                    mdi-download
                                </v-icon> Draf</v-chip>
                        </a>
                        <v-chip @click="openTabRespon(dokCeisa40[item.index].idHeader, dokCeisa40[item.index].nomorAju)">
                            <v-icon size="small">
                                mdi-magnify
                            </v-icon>
                        </v-chip>
                        <v-chip
                            @click="showDialogKirim(dokCeisa40[item.index].idHeader, dokCeisa40[item.index].kodeProses)">
                            Kirim Ulang INSW
                        </v-chip>
                    </v-chip-group>
                </template>
            </v-data-table>
            <Ceisa40TabRespon></Ceisa40TabRespon>
        </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <v-card-text>
                Kirim ulang dokumen ke INSW?
            </v-card-text>
            <v-card-actions>
                <v-btn color="danger" @click="dialog = false">Batal</v-btn>
                <v-btn color="success" @click="kirimUlang(idHeaderCurrent)">Kirim</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import Ceisa40TabRespon from './Ceisa40TabRespon.vue';
import { ref, watch } from 'vue';
import { storeToRefs } from "pinia";
import { useCeisa40Store } from '@/store/ceisa40Store';
import { useAppStore } from '@/store/app';
import http from '@/services/http';

const props = defineProps({
    query: {
        type: String,
        default: ""
    },
    page: {
        type: Number,
        default: 10
    }
})

const app = http;
const appStore = useAppStore();
const { dokCeisa40, getRiwayatRespon, getRiwayatStatus, kirimUlangINSW } = useCeisa40Store();
const { tabRespon, idHeaderCurrent, nomorAjuCurrent, selectedAju, getPenerimaanDokumen } = storeToRefs(useCeisa40Store())
const headers = [
    { title: 'ID Header', key: 'idHeader', align: ' d-none' },
    { title: 'ID Respon', key: 'idRespon', align: ' d-none' },
    { title: 'Kode Dokumen', key: 'kodeDokumen', align: ' d-none' },
    { title: 'Dokumen', key: 'namaDokumen' },
    { title: 'CAR', key: 'nomorAju' },
    { title: 'Nopen', key: 'nomorDaftar' },
    { title: 'Tanggal Nopen', key: 'tanggalDaftar' },
    { title: 'Nama Perusahaan', key: 'namaPerusahaan' },
    { title: 'Nama PPJK', key: 'namaPpjk' },
    { title: 'status respon', key: 'namaRespon' },
    { title: 'Status', key: 'namaProses' },
    { title: 'Actions', key: 'actions', sortable: false },
];
const openTabRespon = (idHeader, noAju) => {
    tabRespon.value = true
    idHeaderCurrent.value = idHeader
    nomorAjuCurrent.value = noAju
    getRiwayatRespon(idHeaderCurrent.value, nomorAjuCurrent.value)
    getRiwayatStatus(idHeaderCurrent.value)
}

const dialog = ref(false);
const search = ref(props.query);

const showDialogKirim = (idHeader, kodeProses) => {
    if (kodeProses !== "105") return appStore.snackbarAct("top", "Gak bisa dikirim, Puh, Sepuh. Udah terkirim kali, Puh.", "red");
    dialog.value = true
    idHeaderCurrent.value = idHeader
}

const kirimUlang = async (idHeader) => {
    dialog.value = false
    await kirimUlangINSW(idHeader)
    appStore.snackbarAct("top", "Berhasil dikirim ke INSW", "green");
}
</script>
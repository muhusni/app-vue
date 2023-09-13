<template>
    <v-card title="Tiket BC Soetta" :loading="isLoading" :disabled="isLoading">
        <v-card-text>
            <v-row justify="center" class="mb-2">
                <v-col cols="6">
                    <v-form @submit.prevent="cariTiket">
                        <v-text-field density="compact" maxlength="5" v-model="tiketId" variant="outlined"
                            label="Cari Nomor Tiket" append-inner-icon="mdi-magnify" single-line hide-details
                            @click:append-inner="cariTiket"></v-text-field>
                    </v-form>
                </v-col>
            </v-row>
            <v-card title="Detail Tiket" class="card-left bgreen mb-5" elevation="5">
                <v-card-text>
                    <v-table hover>
                        <tbody>
                            <tr>
                                <td>Nomor Tiket</td>
                                <td> {{ TiketStore.tiket.ID }}</td>
                            </tr>
                            <tr>
                                <td>Kategori</td>
                                <td>{{ TiketStore.cekDokumen(TiketStore.tiket.categoryid) }}</td>
                            </tr>
                            <tr>
                                <td>Permasalahan</td>
                                <td>
                                    <div class="jarak" v-html="TiketStore.tiket.body"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>Jumlah Aju</td>
                                <td> {{ regex.length === 0 ? "" : regex.length }} </td>
                            </tr>
                            <tr>
                                <td>Detail Aju</td>
                                <td>
                                    <span v-for="r in regex"> {{ r }}<br></span>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
            <v-row>
                <v-col cols="12" sm="9">
                    <v-card title="INSW" class="card-left bgreen mb-5" elevation="5">
                        <v-card-text>
                            <v-data-table v-model="selectedAju" :headers="headers" show-select hover :items="ajuFinal"
                                class="elevation-1">
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="3">
                    <TemplateLaporan elevation="5" class="card-left bgreen mb-5" />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useTiketStore } from '@/store/tiketStore'
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import TemplateLaporan from "@/views/app/TiketView/TemplateLaporan.vue"

const tiketId = ref('');
const regex = ref([]);
const TiketStore = useTiketStore();
const { ajuFinal, selectedAju } = storeToRefs(TiketStore)
const { snackbarAct } = useAppStore();
let { isLoading } = storeToRefs(useAppStore())

const cariTiket = async () => {
    if (tiketId.value === '') return;
    isLoading.value = true
    try {
        await TiketStore.getTiket(tiketId.value);
        if (TiketStore.tiket.body.match(/[\d]{6}-?[\d]{6}-?[\d]{8}-?[\d]{6}/g) === null) {
            isLoading.value = false
            return
        }
        regex.value = TiketStore.tiket.body.match(/[\d]{6}-?[\d]{6}-?[\d]{8}-?[\d]{6}/g).map((x) => x.replace(/\D/g, ''));
        isLoading.value = false
        regex.value.forEach((e) => {
            if (TiketStore.cekDokumen(TiketStore.tiket.categoryid) === 'PIB') {
                TiketStore.getPib(e);
            } else {
                TiketStore.getPeb(e);
            }
        });
    } catch (e) {
        console.log(e)
        snackbarAct(true, "Data tidak ditemukan", "red");
        isLoading.value = false
    }
    // console.log(regex)
}

// const cekDokumen = (kategori) => kategori === 6 || kategori === 18 || kategori === 24 ? 'PIB' : (kategori === 7 || kategori === 20 || kategori === 25 ? 'PEB' : '');

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
<style scoped>
.jarak {
    padding-top: 20px;
    padding-bottom: 20px;
}

.card-top {
    border-top: 3px solid;
}

.card-left {
    border-left: 3px solid
}

.bgreen {
    border-color: green;
}

.bred {
    border-color: red;
}

.bblue {
    border-color: blue;
}

.bpurple {
    border-color: purple
}
</style>
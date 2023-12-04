<template>
    <v-dialog v-model="tabRespon" max-width="1000px">
        <v-card :loading="riwayatStatus.length < 1" :disabled="riwayatStatus.length < 1">
            <v-card-text>
                <v-card>
                    <v-tabs v-model="tab">
                        <v-tab value="one">Respon</v-tab>
                        <v-tab value="two">Riwayat Status</v-tab>
                        <!-- <v-tab value="three">Item Three</v-tab> -->
                    </v-tabs>

                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="one">
                                <v-table heigh="100px">
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                Respon
                                            </th>
                                            <th class="text-left">
                                                Waktu Respon
                                            </th>
                                            <th class="text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in riwayatRespon" :key="item.name">
                                            <td>{{ item.uraianSingkatRespon }}</td>
                                            <td>{{ reformatDate(item.waktuRespon) }}</td>
                                            <td>
                                                <v-chip v-if="item.idRespon !== null" style="cursor: pointer;"
                                                    :href="`${app.defaults.baseURL}/ceisa40/download/${item.idHeader}/${item.idRespon}`">
                                                    <v-icon size="small">
                                                        mdi-download
                                                    </v-icon></v-chip>
                                                <v-chip v-else style="cursor: pointer;"
                                                    :href="`${app.defaults.baseURL}/ceisa40/download/awal/${item.nomorAju}/${item.idResponAwal}`">
                                                    <v-icon size="small">
                                                        mdi-download
                                                    </v-icon></v-chip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-window-item>

                            <v-window-item value="two">
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th>Waktu Mulai</th>
                                            <th>Waktu Selesai</th>
                                            <th>Uraian</th>
                                            <th>Petugas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="status in riwayatStatus">
                                            <td>{{ reformatDate(status.waktuMulai) }}</td>
                                            <td>{{ reformatDate(status.waktuSelesai) }}</td>
                                            <td>{{ status.namaProses }}</td>
                                            <td>{{ status.nipMulai ?? "" + ((status.nipMulai !== null && status.nipSelesai !==
                                                null) ? " - " : "") + status.nipSelesai ?? "" }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
                <!-- <v-data-table :headers="headers" hover :items="riwayatRespon" select-strategy="all" class="elevation-1">
                </v-data-table> -->
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { useCeisa40Store } from '@/store/ceisa40Store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import http from '@/services/http';
const { tabRespon, riwayatRespon, riwayatStatus } = storeToRefs(useCeisa40Store())
const closeDialog = () => {
    tabRespon.value = false
}

const app = http;
const tab = ref(null);
const reformatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
// const headers = [
//     { title: 'ID Header', key: 'idHeader', align: ' d-none' },
//     { title: 'ID Respon', key: 'idRespon', align: ' d-none' },
//     { title: 'ID Respon', key: 'idResponAwal', align: ' d-none' },
//     { title: 'Respon', key: 'uraianSingkatRespon' },
//     { title: 'Waktu Respon', key: 'waktuRespon' },
//     { title: 'Actions', key: 'actions', sortable: false },
// ];
</script>
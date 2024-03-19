<template>
    <v-btn @click="openDialog" color="success">
        Lapor IKC
    </v-btn>
    <v-dialog v-model="dialog" persistent width="1024">
        <form @submit.prevent="submitIkc">
            <v-card :loading="isLoading" :disabled="isLoading">
                <v-card-title>
                    <span class="text-h5">Lapor IKC</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <!-- <v-text-field label="Bisnis Proses" v-model="dataTiket.bisnisProses"
                                    required></v-text-field> -->
                                <v-combobox :items="tiketProses.map(process => process.namaProses)"
                                    v-model="dataTiket.bisnisProses" label="Bisnis Proses" @change="updateSubprocesses"
                                    required></v-combobox>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <!-- <v-text-field label="Sub Proses" v-model="dataTiket.subProses"
                                    hint="Isi lengkap subprosesnya, atau kalo binggung tulis 'lainnya' aja" required
                                    persistent-hint></v-text-field> -->
                                <v-combobox :items="selectedProcessObj.subProses" v-model="dataTiket.subProses" required
                                    label="Sub Proses"></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Judul Tiket IKC" v-model="dataTiket.judulTiketIkc"
                                    required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-textarea required rows="10" v-model="dataTiket.uraian" label="Uraian"
                                    variant="solo-filled"></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-file-input label="File input" variant="solo-filled" v-model="dataTiket.fileName"></v-file-input>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="success" variant="text" type="submit">
                        Kirim IKC
                    </v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useTiketStore } from '@/store/tiketStore';
import { useCeisa40Store } from '@/store/ceisa40Store';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { cekDokumen } = useTiketStore();
const dialog = ref(false);
const TiketStore = useTiketStore();
const Ceisa40Store = useCeisa40Store();
const { snackbarAct } = useAppStore();
let { isLoading } = storeToRefs(useAppStore())
const { noTiketIkc } = storeToRefs(useTiketStore())


const dataTiket = reactive({
    bisnisProses: '',
    subProses: '',
    judulTiketIkc: '',
    uraian: '',
    fileName: ''
});

const tiketProses = ref([
    {
        namaProses: 'CEISA Ekspor',
        subProses: ['Modul PEB', 'Pengiriman / Komunikasi', 'NSW - Perijinan', 'NSW- Status Pengiriman', 'Validasi', 'Pembayaran', 'Analyzing Point', 'Penjaluran', 'PPDE', 'Pemeriksaan fisik', 'GATE', 'Respon', 'Petugas', 'Other']
    },
    {
        namaProses: 'CEISA Impor',
        subProses: ['Submit Data', 'Validasi', 'Konfirmasi Pembayaran', 'Analyzing Point', 'Penjaluran', 'Pemeriksaan Barang', 'Pemeriksaan Dokumen', 'SPPB', 'Gate', 'SPTNP', 'Pengeluaran Barang', 'Other']
    },
    {
        namaProses: 'CEISA TPB',
        subProses: ['BC 2.3', 'BC 2.4', 'BC 2.6.1', 'BC 2.6.2', 'Modul TPB', 'Analyzing Point', 'Inhouse', 'Lainnya']
    }
]);

const selectedProcessObj = computed(() => tiketProses.value.find(process => process.namaProses === dataTiket.bisnisProses) || { subProses: [] });

const updateSubprocesses = () => {
    dataTiket.subProses = ''; // Reset the selected subprocess when the process changes
};

watch(() => dataTiket.bisnisProses, () => {
    updateSubprocesses();
});


const openDialog = () => {
    if (TiketStore.selectedAju.length < 1 && Ceisa40Store.selectedAju.length < 1) return snackbarAct(true, `tidak ada data yang dipilih`, "red")
    dialog.value = true;
    dataTiket.bisnisProses = cekDokumen(TiketStore.tiket.categoryid) === 'PIB' ? 'CEISA Impor' : (cekDokumen(TiketStore.tiket.categoryid) === 'PEB' ? 'CEISA Ekspor' : '')
    dataTiket.subProses = cekDokumen(TiketStore.tiket.categoryid) === 'PIB' ? 'Penjaluran' : (cekDokumen(TiketStore.tiket.categoryid) === 'PEB' ? 'Penjaluran' : 'Other')
    dataTiket.judulTiketIkc = formatJudul()
    dataTiket.uraian = `Yth. IKC \nMohon bantuan Dokumen berikut:
        ${TiketStore.selectedAju.map(aju => {
        return `\nNo. Aju: ${aju.car} \nNama Perusahaan: ${aju.nm_perusahaan} \nStatus: ${aju.status}\n`
    }).join("\n")}
        ${Ceisa40Store.selectedAju.map(aju => {
        return `\nNo. Aju: ${aju.nomorAju}\nNama Perusahaan: ${aju.namaPerusahaan} \nStatus: ${aju.namaProses}\nDokumen: ${aju.namaDokumen}\n`
    }).join("\n")}
    \nAtas Bantuannya kami ucapkan terima kasih.`
}

const submitIkc = async () => {
    try {
        isLoading.value = true;
        // construct uploaded file
        const formData = new FormData();
        Object.keys(dataTiket).forEach(key => formData.append(key, dataTiket[key]));
        dataTiket.fileName.forEach(file => formData.append('files', file));

        // submit data
        const tiket = await TiketStore.laporIkcNew(formData);
        isLoading.value = false;
        noTiketIkc.value = tiket.data;
        snackbarAct("top", `Berhasil lapor IKC dengan nomor tiket: ${tiket.data}`, 'green');
        dialog.value = false;
    } catch {
        snackbarAct("top", `Gagal Lapor`, 'red');
        isLoading.value = false;
    }
}

const formatJudul = () => {
    if (TiketStore.selectedAju.length > 0) {
        return `${cekDokumen(TiketStore.tiket.categoryid)} terhenti pada status ${TiketStore.selectedAju[0].status}`;
    } if (Ceisa40Store.selectedAju.length > 0) {
        return `${cekDokumen(TiketStore.tiket.categoryid)} terhenti pada status ${Ceisa40Store.selectedAju[0].namaProses}`;
    } else {
        return '';
    }
};
</script>
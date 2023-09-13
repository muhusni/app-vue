<template>
    <v-card class="overflow-y-auto" max-height="600">
        <v-card-actions>
            <h3>Lapor IKC</h3>
            <v-spacer></v-spacer>
            <v-btn @click="copyButton" >
                Copy
                <v-icon end icon="mdi-content-copy"></v-icon>
            </v-btn>
        </v-card-actions>
        <v-card-text ref="message" id="IdOfTextToCopy">
            Yth. IKC <br>
            Mohon bantuan Dokumen {{ TiketStore.cekDokumen(TiketStore.tiket.categoryid) }} berikut: <br>
            <template v-for="aju in TiketStore.selectedAju">
                <br>
                No. Aju: {{ aju.car }}<br>
                Nama Perusahaan: {{ aju.nm_perusahaan }}<br>
                status: {{ aju.status }}<br>
            </template>
            <br>
            Atas bantuannya kami ucapkan terima kasih.
        </v-card-text>
    </v-card>
</template>
<script setup>
import { useTiketStore } from '@/store/tiketStore';
import { ref } from 'vue';
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import { useAppStore } from "@/store/app";


const message = ref(null);
const TiketStore = useTiketStore()
const { snackbarAct } = useAppStore();

// const cekDokumen = (kategori) => kategori === 6 || kategori === 18 || kategori === 24 ? 'PIB' : (kategori === 7 || kategori === 20 || kategori === 25 ? 'PEB' : '');
const copyButton = () => {
    toClipboard(message.value.$el.innerText)
    snackbarAct(true, "Text telah disalin", "green");
}
</script>

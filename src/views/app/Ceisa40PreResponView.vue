<template>
    <Ceisa40TableVue />
    <v-btn color="success">
        Send INSW for Selected Aju
        <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card>
                <v-card-text>
                    Kirim Data
                </v-card-text>
                <v-card-actions>
                    <v-btn color="danger" @click="dialog = false">Batal</v-btn>
                    <v-btn color="success" @click="sendINSW()">KIRIM INSW</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
    {{ getPenerimaanDokumen }}
</template>
<script setup>
import Ceisa40TableVue from '@/components/Ceisa40Table.vue';
import { useCeisa40Store } from '@/store/ceisa40Store';
import { useAppStore } from "@/store/app";
import { ref } from 'vue';
import { onMounted } from 'vue';

const { getDokumenCeisa40PreRespon, sendAllINSW } = useCeisa40Store();
onMounted(() => {
    getDokumenCeisa40PreRespon()
})

const dialog = ref(false);
const { snackbarAct } = useAppStore();
const sendINSW = async () => {
    // console.log(.laporIkc)
    dialog.value = false
    try {
        await sendAllINSW()
        snackbarAct(true, `telah lapor INSW`, "green")
    } catch {
        snackbarAct(true, `error gagal lapor`, "red")
    }
    // 
}
</script>
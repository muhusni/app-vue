<template>
    <div class="d-flex justify-end mb-3">
        <v-btn color="success">
            Send INSW for Selected Aju
            <v-dialog v-model="dialog" activator="parent" width="300" height="500">
                <v-card :loading="isLoading">
                    <v-card-text class="d-flex justify-center">
                        <h2>
                            <strong class="text-green-lighten-1">Sukses: {{ counterSuccess }} / {{ Ceisa40Store.selectedAju.length }} </strong> <br>
                            <span class="text-red-lighten-2"> Error: {{ counterError }} / {{ Ceisa40Store.selectedAju.length }}</span>
                        </h2>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="danger" @click="dialog = false">Batal</v-btn>
                        <v-btn color="success" @click="sendINSW()" :disabled="isLoading">KIRIM INSW</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-btn>
    </div>
    <Ceisa40TableVue :page="-1" query="LNSW - Penerimaan Dokumen"/>
</template>
<script setup>
import Ceisa40TableVue from '@/components/Ceisa40Table.vue';
import { useCeisa40Store } from '@/store/ceisa40Store';
import { useAppStore } from "@/store/app";
import { ref } from 'vue';
import { onMounted } from 'vue';

const { getDokumenCeisa40PreRespon, sendAllINSW } = useCeisa40Store();
const Ceisa40Store = useCeisa40Store();
onMounted(() => {
    getDokumenCeisa40PreRespon()
})

const counterSuccess = ref(0);
const counterError = ref(0);

const isLoading = ref(false);
const dialog = ref(false);
const { snackbarAct } = useAppStore();

// const sendINSW = async () => {
//     counterSuccess.value = 0
//     counterError.value = 0
//     isLoading.value = true;
//     const requests = Ceisa40Store.selectedAju.map((aju) => {
//         return Ceisa40Store.kirimUlangINSW(aju.idHeader)
//             .then((response) => {
//                 // Check if the response status is 200
//                 if (response.status === 200) {
//                     counterSuccess.value += 1;
//                 }
//                 // You can add more logic here based on the response if needed
//                 return response;
//             })
//             .catch((error) => {
//                 counterError.value += 1;
//                 console.error('Error fetching data:', error);
//                 throw error; // Propagate the error to the next catch block
//             });
//     });

//     // dialog.value = false
//     Promise.all(requests)
//         .then(() => {
//             isLoading.value = false;
//             snackbarAct(true, `Berhasil kirim ulang INSW`, "green")
//         })
//         .catch((error) => {
//             snackbarAct(true, `Gagal kirim ulang INSW`, "red")
//             console.error('Error fetching data:', error);
//             isLoading.value = false;
//         });

// }

const sendINSW = async () => {
    counterSuccess.value = 0;
    counterError.value = 0;
    isLoading.value = true;

    for (const aju of Ceisa40Store.selectedAju) {
        try {
            if (aju.kodeProses !== "105") throw 'error';
            const response = await Ceisa40Store.kirimUlangINSW(aju.idHeader);

            if (response.status === 200) {
                counterSuccess.value += 1;
            }
        } catch (error) {
            counterError.value += 1;
            console.error('Error fetching data:', error);
        }
    }
    isLoading.value = false;
    
    snackbarAct(true, `telah lapor INSW`, "green");
};



</script>
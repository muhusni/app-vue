<template>
    <v-card title="Browse PIB/PEB INSW" :loading="isLoading" :disabled="isLoading">
        <v-card-text>
            <v-row justify="center" class="mb-2">
                <v-col cols="6">
                    <v-form @submit.prevent="getDokumen">
                        <v-text-field density="compact" v-model="noAju" variant="outlined"
                            label="Cari Nomor Aju" append-inner-icon="mdi-magnify" single-line hide-details
                            @click:append-inner="getDokumen"></v-text-field>
                        <v-radio-group v-model="jenisDokumen" inline>
                            <v-radio label="PEB" value="PEB"></v-radio>
                            <v-radio label="PIB" value="PIB"></v-radio>
                        </v-radio-group>
                    </v-form>
                </v-col>
            </v-row>
            <InswTable />
            <!-- <TemplateLaporan /> -->
        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import InswTable from '@/components/InswTable.vue';
// import TemplateLaporan from './TiketView/TemplateLaporan.vue';
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { useTiketStore } from '@/store/tiketStore';
let { isLoading } = storeToRefs(useAppStore())

const noAju = ref('');
const jenisDokumen = ref('PEB')
const TiketStore = useTiketStore();
const { snackbarAct } = useAppStore();

const getDokumen = async () => {
    if (noAju.value.replace(/\D/g, '').length !== 26) {
        snackbarAct(true, "Nomor Aju harus 26 digit angka", "red")
        return
    }
    TiketStore.clearData()
    isLoading.value = true
    jenisDokumen.value == 'PEB' ? await TiketStore.getPeb(noAju.value.replace(/\D/g, '')) : await TiketStore.getPib(noAju.value.replace(/\D/g, ''))  
    isLoading.value = false
}

onMounted(() =>{
    TiketStore.clearData()
})
</script>
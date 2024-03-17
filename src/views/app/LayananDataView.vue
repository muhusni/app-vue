<template>
    <v-card title="Layanan Data Duktek">
        <v-card-text>
            <v-row class="d-flex justify-center">
                <v-col cols="12" sm="6" class="mx-6">
                    <form @submit.prevent="downloadData">
                        <v-autocomplete label="Layanan Data" :items="layananData" item-value="id" item-title="nama_layanan"
                            return-object v-model="formData.chosenData" variant="outlined"></v-autocomplete>
                        <v-text-field v-if="formData.chosenData.fl_start_date" label="Tanggal Awal" type="date"
                            v-model="formData.start_date" variant="outlined" required clearable></v-text-field>
                        <v-text-field v-if="formData.chosenData.fl_end_date" label="Tanggal Akhir" type="date"
                            v-model="formData.end_date" variant="outlined" required clearable></v-text-field>
                        <v-text-field v-if="formData.chosenData.fl_parameter" :label="formData.chosenData.parameter_name"
                            type="text" v-model="formData.parameter" variant="outlined" required clearable></v-text-field>
                        <div class="d-flex justify-center">
                            <v-btn :disabled="isLoading" :loading="isLoading" class="my-auto" type="submit"
                                color="success">Download
                                <v-icon>mdi-download</v-icon></v-btn>
                        </div>
                    </form>
                </v-col>
                <!-- <v-col cols="12" sm="6">6</v-col> -->
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
const form = ref(false)
const layananData = ref([
    {
        'id': 1,
        'nama_layanan': 'Barang Kiriman FOB < 3 dollar',
        'fl_start_date': 1,
        'fl_end_date': 1,
        'fl_parameter': 0,
        'parameter_name': null,
        'fl_parameter2': 0,
        'parameter_name2': null,
    },
    {
        'id': 2,
        'nama_layanan': 'Barang Kiriman by HS',
        'fl_start_date': 1,
        'fl_end_date': 1,
        'fl_parameter': 1,
        'parameter_name': 'HS Code',
        'fl_parameter2': 0,
        'parameter_name2': null,
    },
]);

const formData = reactive({
    chosenData: 'Pilih Data',
    start_date: '',
    end_date: '',
    parameter: '',
    parameter2: ''
});
const isLoading = ref(false)

const downloadData = async () => {
    if (formData.chosenData === 'Pilih Data') return
    isLoading.value = true
    const response = await axios.post('http://192.168.146.99:5000/download-query', formData, {
        responseType: 'blob', // Important to set responseType to 'blob'
    });
    downloadFile(response.data, `${formData.chosenData.nama_layanan} ${formData.start_date} - ${formData.end_date}.xlsx`);
    isLoading.value = false
    return response.data;
}

const downloadFile = (data, fileName) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);

    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

</script>
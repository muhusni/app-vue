<template>
    <v-card title="Dashboard Duktek" class="mb-3" />
    <v-row class="mb-3" v-if="Ceisa40Store.getJenisDokumen.length === 0">
        <v-col cols="12" md="4">
            <v-skeleton-loader height="250" type="paragraph"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
            <v-skeleton-loader height="250" type="paragraph"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
            <v-skeleton-loader height="250" type="paragraph"></v-skeleton-loader>
        </v-col>
    </v-row>
    <v-row v-else class="mb-1">
        <v-col v-for="jenisDok in Ceisa40Store.getJenisDokumen" cols="12" md="4">
            <v-card min-height="150">
                <div>
                    <v-card-title>
                        {{ jenisDok }}
                    </v-card-title>
                </div>
                <v-card-text class="d-flex-justify-center">
                    <v-row>
                        <v-col v-for="dok in Ceisa40Store.getStatusDokumen(jenisDok)" cols="4">
                            <h1>{{ Ceisa40Store.getDokumenPerStatus(dok, jenisDok).length }}</h1>
                            <small>{{ dok }}</small>
                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="mt-1">
        <v-col cols="12" md="8">
            <v-card v-if="data.datasets[0].data.length > 5" min-height="300">
                <v-card-title>
                    <h1></h1>
                </v-card-title>
                <v-card-text class="d-flex justify-center">
                    <Bar v-if="data.datasets[0].data.length > 5" :data="data" :options="options" />
                </v-card-text>
            </v-card>
            <v-skeleton-loader v-else height="300" type="paragraph"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4" >
            <v-skeleton-loader height="100" class="mb-3" type="paragraph" v-if="loadingLoginPortal"></v-skeleton-loader>
            <v-card title="Portal CEISA 4.0" class="mb-3" :color="statusLoginPortal ? 'success' : 'error'" v-else>
                <v-card-text>
                    <h2> Status Login: {{  statusLoginPortal ? "UP" : "DOWN" }}</h2>
                </v-card-text>
            </v-card>
            <v-skeleton-loader height="100" type="paragraph" v-if="loadingLoginCeisa40"></v-skeleton-loader>
            <v-card title="CEISA 4.0 Pegawai" :color="statusLoginCeisa40 ? 'success' : 'error'" v-else>
                <v-card-text>
                    <h2> Status Login: {{  statusLoginCeisa40 ? "UP" : "DOWN" }}</h2>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup>
import { useCeisa40Store } from '@/store/ceisa40Store';
import { onMounted } from 'vue';
// import Chart from 'chart.js/auto';
import { onUnmounted } from 'vue';
import { reactive, ref } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)
const kodeDokumen = ['30', '20', '660', '40', '23', '27', '41'];
let jumlahDokumen = reactive([]);
const data = reactive({
    labels: ['PEB', 'PIB', 'Rush Handling', 'BC 4.0', 'BC 2.3', 'BC 2.7'],
    datasets: [{
        label: 'Jumlah Dokumen Terdaftar CEISA 4.0 Hari ini',
        data: jumlahDokumen,
        backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
})




const getJumlah = (kodeDokumen) => {
    const requests = kodeDokumen.map((kode) => Ceisa40Store.getJumlahDokumen(kode))
    data.datasets[0].data = []
    Promise.all(requests)
        .then((response) => {
            data.datasets[0].data = response;
            // loading.value = false;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // loading.value = false;
        });
    // kodeDokumen.forEach((kodeDok) => {
    //     Ceisa40Store.getJumlahDokumen(kodeDok).then((response) => {
    //         data.datasets[0].data.push(response.data)
    //     });
    // });
    console.log(jumlahDokumen);
}



const options = ref({
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                mirror: true
            }
        }]
    }
});

const Ceisa40Store = useCeisa40Store();

const statusLoginCeisa40 = ref(false);
const statusLoginPortal = ref(false);
const loadingLoginCeisa40 = ref(false)
const loadingLoginPortal = ref(false)

const loginPortal = async () => {
    loadingLoginPortal.value = true
    const login = await Ceisa40Store.loginPortal();
    loadingLoginPortal.value = false
    statusLoginPortal.value = login.data === 200 
}

const loginCeisa40 = async () => {
    loadingLoginCeisa40.value = true
    const login = await Ceisa40Store.loginCeisa40();
    loadingLoginCeisa40.value = false
    statusLoginCeisa40.value = login.data === 200
}

let intervalId
onMounted(() => {
    Ceisa40Store.clearData();
    Ceisa40Store.getDokumenCeisa40PreRespon();
    getJumlah(kodeDokumen);
    loginCeisa40();
    loginPortal();
    intervalId = setInterval(() => {
        getJumlah(kodeDokumen);
        Ceisa40Store.clearData();
        Ceisa40Store.getDokumenCeisa40PreRespon();
        loginCeisa40();
        loginPortal();
    }, 120000);
})

onUnmounted(() => clearInterval(intervalId))


// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

</script>
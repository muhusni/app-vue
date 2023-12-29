<template>
  <v-card title="Browse CEISA 4.0" :loading="isLoading" :disabled="isLoading">
    <v-card class="mb-3">
      <v-form @submit.prevent="handleSubmit" ref="myForm" validate-on="submit">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field clearable variant="outlined" label="Nomor Daftar" v-model="query.nomorDaftar"></v-text-field>
              <!-- <v-text-field clearable variant="outlined" label="Jenis Dokumen"
                v-model="query.jenisDokumen"></v-text-field> -->
              <v-autocomplete variant="outlined" :items="jenisDokumen" item-title="title" item-value="value"
                v-model="query.kodeDokumen" required label="Jenis Dokumen"></v-autocomplete>
              <v-text-field clearable variant="outlined" label="Nomor Aju" v-model="query.nomorAju"></v-text-field>
              <v-text-field clearable variant="outlined" label="Nama Perusahaan"
                v-model="query.namaPerusahaan"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <!-- <v-text-field clearable variant="outlined" label="Kode Jalur" v-model="query.kodeJalur"></v-text-field> -->
              <v-select label="Kode Jalur" variant="outlined" :items="['H', 'M']" clearable
                v-model="query.kodeJalur"></v-select>
              <v-radio-group inline class="mb-4" v-model="query.status">
                <v-radio label="terdaftar" value="terdaftar"></v-radio>
                <v-radio label="proses" value="proses"></v-radio>
                <v-radio label="reject" value="reject"></v-radio>
              </v-radio-group>
              <v-row>
                <v-col cols="6">
                  <v-text-field clearable variant="outlined" type="date" label="Tanggal Daftar"
                    v-model="query.tanggalDokumenStart"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field clearable variant="outlined" type="date" label="Tanggal Daftar" 
                    v-model="query.tanggalDokumenEnd" 
                    hint="Tanggal Akhir Wajib diisi apabila mengisi Tanggal Awal"
                    persistent-hint
                    ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="d-flex justify-end">
            <v-btn type="submit" color="blue">Cari <v-icon>mdi-magnify</v-icon></v-btn>
          </div>
        </v-card-text>
      </v-form>
    </v-card>
    <Ceisa40TableVue />
  </v-card>
</template>
<script setup>
import Ceisa40TableVue from '@/components/Ceisa40Table.vue';
import { useCeisa40Store } from '@/store/ceisa40Store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { query } = storeToRefs(useCeisa40Store());
const { getDokumenCeisa40V2 } = useCeisa40Store();
const isLoading = ref(false);
const myForm = ref(null);

const jenisDokumen = ref([
  {
    title: 'BC 1.6',
    value: '16'
  },
  {
    title: 'BC 2.0 - Impor',
    value: '20'
  },
  {
    title: 'BC 3.0 - Ekspor',
    value: '30'
  },
  {
    title: 'BC 2.3',
    value: '23'
  },
  {
    title: 'BC 2.5',
    value: '25'
  },
  {
    title: 'BC 4.0',
    value: '40'
  },
  {
    title: 'BC 4.1',
    value: '40'
  },

]);

const handleSubmit = async () => {
    isLoading.value = true;
    await getDokumenCeisa40V2();
    isLoading.value = false;
}


// const requiredIfStartDateFilled = () => {
//   console.log("start tanggal", query.tanggalDokumenStart.value)
//   if (query.tanggalDokumenStart.value !== '') {
//     return !!query.tanggalDokumenEnd.value || 'Tanggal Akhir Wajib diisi apabila mengisi Tanggal Awal';
//   }
//   return true;
// };
</script>

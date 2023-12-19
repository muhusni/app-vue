<template>
  <v-card title="Browse CEISA 4.0" class="mb-3">
    <v-forms @submit.prevent>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field clearable variant="outlined" label="Nomor Daftar"></v-text-field>
            <v-text-field clearable variant="outlined" label="Jenis Dokumen"></v-text-field>
            <v-text-field clearable variant="outlined" label="Nomor Aju"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field clearable variant="outlined" label="Kode Jalur"></v-text-field>
            <v-radio-group v-model="inline" inline class="mb-4">
              <v-radio label="terdaftar" value="radio-1"></v-radio>
              <v-radio label="proses" value="radio-2"></v-radio>
              <v-radio label="reject" value="radio-2"></v-radio>
            </v-radio-group>
            <v-row>
              <v-col cols="6">
                <v-text-field clearable variant="outlined" type="date" label="Tanggal Daftar"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field clearable variant="outlined" type="date" label="Tanggal Daftar"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="d-flex justify-end">
          <v-btn type="submit" color="blue">Cari <v-icon>mdi-magnify</v-icon></v-btn>
        </div>
      </v-card-text>
    </v-forms>
  </v-card>
  <Ceisa40TableVue />
</template>
<script setup>
import Ceisa40TableVue from '@/components/Ceisa40Table.vue';
import { useCeisa40Store } from '@/store/ceisa40Store';

</script>

<template>
  <v-card title="Referensi Bank" :loading="!list_bank.length" :disabled="!list_bank.length">
    <v-table density="compact" hover>
      <thead>
        <th>Kode Bank</th>
        <th>Nama Bank</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="bank in list_bank" :key="bank.BANK_ID">
          <td>{{ bank.KODE_BANK }}</td>
          <td>{{ bank.NAMA_BANK }}</td>
          <td>{{ bank.BANK_ID }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
import http from "@/services/http";
import { onMounted, ref } from "vue";

const list_bank = ref([])
const page = ref([])
const dataBank = () => {
  http.get('/reference/bank').then((response) => {
    list_bank.value = response.data.data
    page.value = response.data
  })
}
onMounted(() => {
  dataBank()
})
</script>

<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <v-card-actions>
      <h3>Tiket BC Soetta </h3>
      <v-spacer></v-spacer>
      <v-btn :href="'https://duktek.bcsoetta.org/tickets/view/' + TiketStore.tiket.ID" target="_blank"
        v-if="typeof TiketStore.tiket.ID !== 'undefined'" color="primary" variant="outlined"
        append-icon="mdi-open-in-new">Go
        To Ticket</v-btn>
    </v-card-actions>
    <v-card-text>
      <v-row justify="center" class="mb-2">
        <v-col cols="6">
          <v-form @submit.prevent="cariTiket" v-if="jenisPencarian == 'tiket'">
            <v-text-field density="compact" maxlength="5" v-model="tiketId" variant="outlined" label="Cari Nomor Tiket"
              append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="cariTiket"></v-text-field>
          </v-form>
          <v-form @submit.prevent="cariAju" v-else>
            <v-textarea density="compact" rows="3" v-model="ajuInput" label="Masukkan Kumpulan Nomor Aju"
              variant="outlined"></v-textarea>
            <v-btn type="submit" class="d-flex justify-content-end" color="success">Cari <v-icon>mdi-magnify</v-icon></v-btn>
          </v-form>
          <v-radio-group v-model="jenisPencarian" inline>
            <v-radio label="Tiket Duktek" value="tiket"></v-radio>
            <v-radio label="Nomor Aju" value="aju"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-card title="Detail Tiket" class="card-left bgreen mb-5" elevation="5">
        <v-card-text>
          <v-table hover>
            <tbody>
              <tr>
                <td>Nomor Tiket</td>
                <td> {{ TiketStore.tiket.ID }}</td>
              </tr>
              <tr>
                <td>Kategori</td>
                <td>{{ TiketStore.cekDokumen(TiketStore.tiket.categoryid) }}</td>
              </tr>
              <tr>
                <td>Permasalahan</td>
                <td>
                  <div class="jarak" v-html="TiketStore.tiket.body"></div>
                </td>
              </tr>
              <tr>
                <td>Jumlah Aju</td>
                <td> {{ regex.length === 0 ? "" : regex.length }} </td>
              </tr>
              <tr>
                <td>Detail Aju</td>
                <td>
                  <span v-for="r in regex" :key="r"> {{ r }}<br></span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col v-if="TiketStore.tiket.categoryid !== 13" cols="12" sm="9">
          <InswTable />
          <Ceisa40Table />
        </v-col>
        <v-col v-else cols="12" sm="9">
          <BarkirTable />
        </v-col>
        <v-col cols="12" sm="3">
          <TemplateLaporan />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useTiketStore } from '@/store/tiketStore'
import { useAppStore } from "@/store/app";
import { useCeisa40Store } from '@/store/ceisa40Store';
import { storeToRefs } from "pinia";
import TemplateLaporan from "@/views/app/TiketView/TemplateLaporan.vue"
import InswTable from "@/components/InswTable"
import Ceisa40Table from '@/components/Ceisa40Table.vue';
import BarkirTable from "@/components/BarkirTable.vue"

const tiketId = ref('');
const ajuInput = ref('');
const regex = ref([]);
const TiketStore = useTiketStore();
const Ceisa40Store = useCeisa40Store();
const { snackbarAct } = useAppStore();
let { isLoading } = storeToRefs(useAppStore())
const jenisPencarian = ref('tiket');

const cariTiket = async () => {
  if (tiketId.value === '') return;
  TiketStore.clearData()
  Ceisa40Store.clearData()
  isLoading.value = true
  await TiketStore.getTiket(tiketId.value);
  if (TiketStore.tiket.categoryid === 13) {
    prosesCn()
  } else {
    prosesPib()
  }
  // console.log(regex)
}



const prosesPib = async () => {
  try {
    if (cariTiket.value == 'tiket') {
      const listAju = TiketStore.tiket.body.match(/[A-Z\d]{6}-?[A-Z\d]{6}-?[A-Z\d]{8}-?[A-Z\d]{6}/g) ?? [];
      const titleAju = TiketStore.tiket.title.match(/[A-Z\d]{6}-?[A-Z\d]{6}-?[A-Z\d]{8}-?[A-Z\d]{6}/g) ?? [];
      let repliesAju = TiketStore.tiket.ticket_replies.map((aju) => aju.body.match(/[A-Z\d]{6}-?[A-Z\d]{6}-?[A-Z\d]{8}-?[A-Z\d]{6}/g) ?? []);
      repliesAju = repliesAju.flat().filter(match => match !== null);
      // console.log(listAju);
      if (titleAju) listAju.push(...titleAju)
      if (repliesAju) listAju.push(...repliesAju)
    } else {
      const listAju = carAju.value.match(/[A-Z\d]{6}-?[A-Z\d]{6}-?[A-Z\d]{8}-?[A-Z\d]{6}/g) ?? [];
    }

    if (listAju === null) {
      isLoading.value = false
      return
    }
    regex.value = await listAju.map((x) => x.replace(/\-/g, ''));
    regex.value = [...new Set(regex.value)]
    isLoading.value = false
    regex.value.forEach((e) => {
      if (TiketStore.cekDokumen(TiketStore.tiket.categoryid) === 'PIB') {
        TiketStore.getPib(e);
      } else {
        TiketStore.getPeb(e);
      }
      Ceisa40Store.getDokumenCeisa40(e);
    });
  } catch (e) {
    console.log(e)
    snackbarAct(true, "Data tidak ditemukan", "red");
    isLoading.value = false
  }
}

const prosesCn = async () => {
  try {
    // if (TiketStore.tiket.body.match(/[0-9A-Z]{10,}/g) === null) {
    //     isLoading.value = false
    //     return
    // }
    regex.value = await TiketStore.tiket.body.match(/(?=\d{0,}?[A-Z]{0,}?\d)[0-9A-Za-z]{9,}/g);
    regex.value = [...new Set(regex.value)]
    // .map((x) => x.replace(/\-/g, ''));
    TiketStore.cekBarkir(regex.value).then((response) => {
      snackbarAct(true, "Data ditemukan", "green");
    }).catch(() => {
      snackbarAct(true, "Error, silakan coba lagi", "red");
    })
    isLoading.value = false
    console.log(regex.value)
  } catch (e) {
    console.log(e)
    snackbarAct(true, "Data tidak ditemukan", "red");
    isLoading.value = false
  }
}

onMounted(() => {
  TiketStore.clearData()
  Ceisa40Store.clearData()
})
// const cekDokumen = (kategori) => kategori === 6 || kategori === 18 || kategori === 24 ? 'PIB' : (kategori === 7 || kategori === 20 || kategori === 25 ? 'PEB' : '');

</script>
<style scoped>
.jarak {
  padding-top: 20px;
  padding-bottom: 20px;
}

.card-top {
  border-top: 3px solid;
}

.card-left {
  border-left: 3px solid
}

.bgreen {
  border-color: green;
}

.bred {
  border-color: red;
}

.bblue {
  border-color: blue;
}

.bpurple {
  border-color: purple
}
</style>

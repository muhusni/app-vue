<template>
  <v-card class="card-left bgreen mb-5 overflow-y-auto" max-height="600" elevation="5" :loading="isLoading">
    <v-card-actions>
      <h3>Lapor IKC</h3>
      <v-spacer></v-spacer>
      <!-- <v-text-field v-model="judul" placeholder="Judul Tiket IKC"></v-text-field> -->
      <v-btn @click="copyButton">
        Copy
        <v-icon end icon="mdi-content-copy"></v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text ref="message" id="IdOfTextToCopy">
      Yth. IKC <br>
      Mohon bantuan Dokumen {{ TiketStore.cekDokumen(TiketStore.tiket.categoryid) }} berikut: <br>
      <template v-for="aju in TiketStore.selectedAju" :key="aju.car">
        <br>
        No. Aju: {{ aju.car }}<br>
        Nama Perusahaan: {{ aju.nm_perusahaan }}<br>
        Status: {{ aju.status }}<br>
      </template>
      <template v-for="aju in Ceisa40Store.selectedAju" :key="aju.nomorAju">
        <br>
        No. Aju: {{ aju.nomorAju }}<br>
        Nama Perusahaan: {{ aju.namaPerusahaan }}<br>
        Status: {{ aju.namaProses }}<br>
        Dokumen: {{ aju.namaDokumen }}<br>
      </template>
      <br>
      Atas bantuannya kami ucapkan terima kasih.
    </v-card-text>
    <v-card-actions>
      <!-- <v-btn color="success" @click="sendIKC()">Lapor IKC</v-btn> -->
      <!-- <v-btn color="success">
                Lapor IKC

                <v-dialog v-model="dialog" activator="parent" width="auto">
                    <v-card>
                        <v-card-text>
                            Laporkan ke IKC?
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="danger" @click="dialog = false">Batal</v-btn>
                            <v-btn color="success" @click="sendIKC()">Lapor IKC</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-btn> -->
      <LaporIkcDialog />
    </v-card-actions>
  </v-card>
  <v-spacer></v-spacer>
  <v-card class="mt-3" title="Template Jawaban Tiket" elevation="5">
    <v-card-actions>
      <v-text-field v-model="noTiketIkc" placeholder="Nomor Tiket IKC"></v-text-field>
      <v-btn @click="copyButtonJawab">
        Copy
        <v-icon end icon="mdi-content-copy"></v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text ref="message2" id="IdOfTextToCopy">
      Selamat {{ currentTime() }} <br />

      Mohon maaf atas ketidaknyamanannya. <br />

      Atas kendala tersebut telah kami teruskan ke IKC dengan tiket {{ noTiketIkc }}. <br />

      Tiket dapat dipantau melalui <a href="https://linktr.ee/HumasBCSH">Bravo BC</a> atau dengan
      membalas pesan ini. <br>

    </v-card-text>
  </v-card>
  <v-card class="card-left bgreen mt-3 mb-5 overflow-y-auto" max-height="600" elevation="5" :loading="isLoading">
    <v-card-actions>
      <h3>Template Jawaban Tiket</h3>
      <v-spacer></v-spacer>
      <v-btn @click="copyButtonTiket">
        Copy
        <v-icon end icon="mdi-content-copy"></v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text ref="messageTiket" id="IdOfTextToCopy">
      Selamat {{ currentTime() }}, dokumen telah mendapat respon {{ responTiket() }}. Silakan dicek kembali. Terima
      kasih.
    </v-card-text>
  </v-card>
</template>
<script setup>
import LaporIkcDialog from './LaporIkcDialog.vue';
import { useTiketStore } from '@/store/tiketStore';
import { ref } from 'vue';
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import { useAppStore } from "@/store/app";
import { storeToRefs } from 'pinia';
import { useCeisa40Store } from '@/store/ceisa40Store';


const message = ref(null);
const message2 = ref(null);
const messageTiket = ref(null);
// const judul = ref("");
const TiketStore = useTiketStore();
const Ceisa40Store = useCeisa40Store();
// const dialog = ref(false);
const { snackbarAct } = useAppStore();
let { isLoading } = storeToRefs(useAppStore())
const { noTiketIkc } = storeToRefs(useTiketStore())



// const cekDokumen = (kategori) => kategori === 6 || kategori === 18 || kategori === 24 ? 'PIB' : (kategori === 7 || kategori === 20 || kategori === 25 ? 'PEB' : '');
const copyButton = () => {
  toClipboard(message.value.$el.innerText)
  snackbarAct(true, "Text telah disalin", "green");
}

const copyButtonTiket = () => {
  toClipboard(messageTiket.value.$el.innerText)
  snackbarAct(true, "Text telah disalin", "green");
}

const copyButtonJawab = () => {
  console.log(message2.value.$el)
  toClipboard(message2.value.$el.innerText)
  snackbarAct(true, "Text telah disalin", "green");
}

const current = new Date();
const currentTime = () => current.getHours() < 11 ? 'pagi' : (current.getHours() < 15 ? 'siang' : (current.getHours() < 18 ? 'sore' : 'malam'))

// const sendIKC = async () => {
//   // console.log(.laporIkc)
//   dialog.value = false
//   try {
//     if (TiketStore.selectedAju.length < 1 && Ceisa40Store.selectedAju.length < 1) return snackbarAct(true, `tidak ada data yang dipilih`, "red")
//     isLoading.value = true
//     let data = await TiketStore.laporIkc(message.value.$el.innerText, judul.value)
//     noTiketIkc.value = data.data
//     isLoading.value = false
//     snackbarAct(true, `telah lapor ${data.data}`, "green")
//   } catch {
//     snackbarAct(true, `error gagal lapor`, "red")
//     isLoading.value = false
//   }
//   //
// }

const responTiket = () => {
  return typeof TiketStore.listAju[0]?.data.data_header !== 'undefined' ? TiketStore.listAju[TiketStore.listAju.length - 1]?.data.data_header[0]?.status.replace(/<br>.+/g, '') : ''
}
</script>

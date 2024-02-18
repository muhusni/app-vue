<template>
    <TiketTable />
</template>
<script setup>
import TiketTable from '@/components/TiketTable.vue';
import { useTiketStore } from '@/store/tiketStore';
import { onMounted } from 'vue';

const TiketStore = useTiketStore();
onMounted(() => {
    TiketStore.getAllTiket()
})
</script>

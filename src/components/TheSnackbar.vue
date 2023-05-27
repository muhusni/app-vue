<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="snackbar.isActive" :color="snackbar.color" location="top">
            {{ snackbar.text }}

            <template v-slot:actions>
                <v-btn  variant="text" @click="snackbar.isActive = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script setup>
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
// import { toRefs } from 'vue';
const { snackbar } = storeToRefs(useAppStore())
</script>
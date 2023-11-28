<template></template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()

async function logout() {
    await authStore.logout()
        .then(res => {
            location.href = '/'
        })
        .catch(err => {
            console.log(err.message)
        })
}

onMounted(() => {
    logout()
})
</script>
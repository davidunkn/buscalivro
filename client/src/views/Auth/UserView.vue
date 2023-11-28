<template>
    <h1>User profile page</h1>

    <div class="profile">
        <div v-if="user">
            <ul>
                <li>Nome: {{ user.firstName }}</li>
                <li>Sobrenome {{ user.lastName }}</li>
                <li>Email {{ user.email }}</li>
                <li>Feedbacks 0</li>
            </ul>

        </div>
    </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '@/stores/auth';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore()

const user = computed(() => {
    return authStore.userDetail
})

async function getUser() {
    await authStore.getUser()
}

onMounted(async () => {
    await getUser()
})

</script>
<template>

    <div v-if="feedbacks?.length !== 0" v-for="(feedback, idx) in feedbacks" :key="idx" class="feedback">
        Mensagem: {{ feedback.message }} <br>
        Autor: {{ feedback.user.firstName }} <br>
        Rating: {{ feedback.rating }} <br>
        Em: {{ feedback.friendlyDate }}
    </div>
    <div v-else>
        Nenhum feedback encontrado.
    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    feedbacks: {
        type: Array
    }
})

</script>

<style scoped>

.feedback {
    border: 1px dashed rgb(235, 235, 235);
    margin: 15px 0px;
    padding: 15px;
}

</style>
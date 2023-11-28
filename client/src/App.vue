<script setup lang="ts">
import { RouterView } from 'vue-router'
import Page from './components/Page.vue'

import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <div class="bl-content">
    <n-message-provider>
      <Page>
        <RouterView />
      </Page>
    </n-message-provider>
  </div>
</template>

<style scoped>
.bl-content {
  margin: 0 auto;
  max-width: 2024px;
}
</style>

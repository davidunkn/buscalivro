<template>
    <n-space vertical size="large">
        <Header />
        <Menu />
        <n-layout>
            <n-layout>
                <n-layout-content content-style="padding: 24px;">
                    <slot />
                </n-layout-content>
            </n-layout>
            <n-layout-footer><p style="text-align:center;">Busca Livro &copy; 2023</p></n-layout-footer>
        </n-layout>
    </n-space>
</template>
  
<style scoped>

</style>

<script lang="ts" setup>
import Header from './Header.vue'
import Menu from './Menu.vue'
import { NLayout, NLayoutContent, NLayoutFooter, NSpace } from 'naive-ui'

</script>
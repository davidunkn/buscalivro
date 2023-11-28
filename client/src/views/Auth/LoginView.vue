<template>
    <h1 style="text-align: center;">Login</h1>

    <div class="loginForm">
        <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="email" label="Email">
                <n-input v-model:value="model.email" @keydown.enter.prevent placeholder="Digite seu email..." />
            </n-form-item>
            <n-form-item path="password" label="Senha">
                <n-input v-model:value="model.password" type="password" placeholder="Digite sua senha..."
                    @keydown.enter.prevent />
            </n-form-item>
            <n-space justify="center" align="center">
                <n-button :disabled="model.email === null" round type="primary" @click="handleLogin">
                    Entrar
                </n-button>
                ou
                <n-button round type="info" @click="goToRegisterPage">
                    Registre-se
                </n-button>
            </n-space>
        </n-form>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import router from '@/router'
import {
    type FormInst,
    type FormItemRule,
    type FormRules,
    useMessage,
    NForm, NFormItem, NFormItemGi, NInput, NButton, NRow, NCol, NGrid, NSpace
} from 'naive-ui'

import { useAuthStore, type LoginData } from '@/stores/auth'


export default defineComponent({
    setup() {
        const formRef = ref<FormInst | null>(null)
        const modelRef = reactive<LoginData>({
            email: null,
            password: null,
        })
        const message = useMessage()
        const authStore = useAuthStore()

        const goToRegisterPage = () => router.push({ path: 'register' })

        const handleLogin = (e: MouseEvent) => {
            e.preventDefault()
            authStore.login(modelRef)
                .then(res => {
                    // message.loading('Logando...')
                    // router.replace({ name: 'user' })
                    location.href = '/user'
                })
                .catch(err => {
                    message.error(err.message)
                })
        }

        const rules: FormRules = {
            email: [
                {
                    required: true,
                    validator(rule: FormItemRule, value: string) {
                        if (!value) {
                            return new Error('Email é obrigatório')
                        } else if (!/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value)) {
                            return new Error('Email inválido')
                        }
                        return true
                    },
                    trigger: ['input', 'blur']
                }
            ],
            password: [
                {
                    required: true,
                    message: 'A senha é obrigatória'
                }
            ]
        }
        return {
            formRef,
            model: modelRef,
            rules,
            goToRegisterPage,
            handleLogin
        }
    },
    components: {
        useMessage, NForm, NFormItem, NFormItemGi, NInput, NButton, NRow, NCol, NGrid, NSpace
    }
})
</script>

<style scoped>
.loginForm {
    max-width: 400px;
    margin: 0 auto;
}
</style>
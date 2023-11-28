<template>
    <h1>Registrar-se</h1>

    <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="email" label="Email">
            <n-input v-model:value="model.email" @keydown.enter.prevent placeholder="Digite seu email..." />
        </n-form-item>
        <n-grid :cols="2" :x-gap="24">
            <n-form-item-gi path="firstName" label="Nome">
                <n-input v-model:value="model.firstName" placeholder="Digite seu nome" @keydown.enter.prevent />
            </n-form-item-gi>
            <n-form-item-gi path="lastName" label="Sobrenome">
                <n-input v-model:value="model.lastName" placeholder="Digite seu sobrenome" @keydown.enter.prevent />
            </n-form-item-gi>
        </n-grid>
        <n-form-item path="password" label="Senha">
            <n-input v-model:value="model.password" type="password" placeholder="Digite sua senha..."
                @input="handlePasswordInput" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item ref="rPasswordFormItemRef" first path="passwordConfirm" label="Repetir senha">
            <n-input v-model:value="model.passwordConfirm" :disabled="!model.password" placeholder="Repita sua senha..."
                type="password" @keydown.enter.prevent />
        </n-form-item>
        <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                    <n-button :disabled="model.email === null" round type="primary" @click="handleValidateButtonClick">
                        Cadastrar
                    </n-button>
                </div>
            </n-col>
        </n-row>
    </n-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
    type FormInst,
    type FormItemInst,
    type FormItemRule,
    type FormValidationError,
    useMessage,
    type FormRules,
    NForm, NFormItem, NFormItemGi, NInput, NButton, NRow, NCol, NGrid
} from 'naive-ui'

import { useAuthStore, type RegisterData } from '@/stores/auth'

export default defineComponent({
    setup() {
        const formRef = ref<FormInst | null>(null)
        const rPasswordFormItemRef = ref<FormItemInst | null>(null)
        const router = useRouter()
        const message = useMessage()
        const authStore = useAuthStore()
        const modelRef = reactive<RegisterData>({
            email: null,
            firstName: null,
            lastName: null,
            password: null,
            passwordConfirm: null
        })
        function validatePasswordStartWith(
            rule: FormItemRule,
            value: string
        ): boolean {
            return (
                !!modelRef.password &&
                modelRef.password.startsWith(value) &&
                modelRef.password.length >= value.length
            )
        }
        function validatePasswordSame(rule: FormItemRule, value: string): boolean {
            return value === modelRef.password
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
            firstName: [
                {
                    required: true,
                    message: 'Nome é obrigatório',
                    trigger: ['input', 'blur']
                }
            ],
            lastName: [
                {
                    required: true,
                    message: 'Sobrenome é obrigatório',
                    trigger: ['input', 'blur']
                }
            ],
            password: [
                {
                    required: true,
                    message: 'A senha é obrigatória'
                }
            ],
            passwordConfirm: [
                {
                    required: true,
                    message: 'Repetir senha é obrigatório',
                    trigger: ['input', 'blur']
                },
                {
                    validator: validatePasswordStartWith,
                    message: 'As senhas não coincidem!',
                    trigger: 'input'
                },
                {
                    validator: validatePasswordSame,
                    message: 'As senhas não coincidem!',
                    trigger: ['blur', 'password-input']
                }
            ]
        }
        return {
            formRef,
            rPasswordFormItemRef,
            model: modelRef,
            rules,
            handlePasswordInput() {
                if (modelRef.passwordConfirm) {
                    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
                }
            },
            handleValidateButtonClick(e: MouseEvent) {
                e.preventDefault()
                formRef.value?.validate(
                    (errors: Array<FormValidationError> | undefined) => {
                        if (!errors) {
                            authStore.register(modelRef)
                                .then(res => {
                                    message.loading('Cadastrando...')
                                    router.replace({ name: 'login' })
                                })
                                .catch(err => {
                                    message.error(err.message)
                                })
                        } else {
                            console.log(errors)
                            message.error('Inválido!')
                        }
                    }
                )
            }
        }
    },
    components: {
        useMessage, NForm, NFormItem, NFormItemGi, NInput, NButton, NRow, NCol, NGrid
    }
})
</script>

<template>
    <n-form ref="formRef" :model="model" :rules="rules">
        <n-space vertical>
            <n-slider v-model:value="model.rating" :step="1" :max="5" :min="0" />
        </n-space>
        <n-form-item path="message" label="Mensagem">
            <n-input v-model:value="model.message" type="textarea" @keydown.enter.prevent
                placeholder="Digite uma mensagem..." />
        </n-form-item>
        <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                    <n-button :disabled="model.message === null" round type="primary" @click="handleValidateButtonClick">
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
    useMessage,
    type FormRules,
    NForm, NFormItem, NFormItemGi, NInput, NButton, NRow, NCol, NGrid, NSlider, NSpace, NInputNumber
} from 'naive-ui'

import { useAuthStore, type User } from '@/stores/auth'
import { usePlaceStore, type Feedback } from '@/stores/bookstores'

export default defineComponent({
    props: {
        markerId: String
    },
    setup(props) {
        const model = reactive<Feedback>({
            user: "",
            place: "",
            message: "",
            rating: 0,
        })

        const message = useMessage()
        const feedbackStore = usePlaceStore()
        const authStore = useAuthStore()

        const rules: FormRules = {
            rating: [
                {
                    required: true,
                    message: 'Nota é obrigatória',
                    trigger: ['input', 'blur']
                }
            ],
            message: [
                {
                    required: true,
                    message: 'Digite alguma mensagem'
                }
            ]
        }
        return {
            model,
            async handleValidateButtonClick(e: MouseEvent) {
                e.preventDefault()

                if (!model.message || !model.rating) {
                    message.warning("Campos em branco!")
                }

                model.place = props.markerId
                model.user = authStore.user.id

                console.log(model)

                await feedbackStore.addFeedback(props.markerId, model)
            },
            rules
        }
    },
    components: {
        useMessage, NForm, NFormItem, NFormItemGi, NInput, NButton, NRow, NCol, NGrid, NSlider, NSpace, NInputNumber
    }
})

</script>
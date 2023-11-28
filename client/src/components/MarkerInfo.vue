<template>
    <n-space justify="center">
        <n-button tertiary type="info" @click="openFeedbacks($props.markerId)" v-model="$props">Feedbacks</n-button>
    </n-space>
    <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" :title="modalName"
        :bordered="false" size="huge" :segmented="segmented">

        <Feedbacks :feedbacks="feedbackList" />

        <template #footer>
            <div style="display:block;margin: 0 auto;">
                <n-button tertiary type="info" @click="openFeedbackForm($props.markerId)" v-model="$props">Dar feedback</n-button>
            </div>
        </template>
    </n-modal>

    <n-modal v-model:show="showForm" class="custom-card" preset="card" :style="bodyStyle" title="Formulario"
        :bordered="false" size="huge" :segmented="segmented">
        <FeedbackForm :marker-id="$props.markerId" />
    </n-modal>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NButton, NModal, NSpace } from 'naive-ui';
import Feedbacks from './Feedbacks.vue'
import FeedbackForm from './FeedbackForm.vue'
import { usePlaceStore } from '@/stores/bookstores'

const placeStore = usePlaceStore()

export interface MarkerData {
    id: String
    name: "" | String
    description: "" | String
}

export default defineComponent({
    props: {
        markerId: String,
        name: String
    },
    setup(props) {

        const markerInfo = ref<MarkerData>({
            id: "0",
            name: "Exemplo",
            description: "asdasd"
        })

        const modalName = props.name

        const feedbackList = [{}]

        return {
            bodyStyle: {
                width: '600px'
            },
            segmented: {
                content: 'soft',
                footer: 'soft'
            } as const,
            showModal: ref(false),
            showForm: ref(false),
            markerInfo,
            modalName,
            feedbackList
        }
    },
    methods: {
        async openFeedbacks(id: String) {
            console.log("Feedback id: ", id)
            const feedbacks = await placeStore.getAllFeedbacks(id)
            this.feedbackList = feedbacks
            console.log(feedbacks)
            this.showModal = true
            this.markerInfo.id = id
            this.markerInfo.name = "Novo titulo"
            this.markerInfo.description = "Nova descricao"
        },
        async openFeedbackForm(id){
            console.log(id)
            this.showForm = true
        }
    },
    components: {
        NButton, NModal, NSpace, Feedbacks, FeedbackForm
    }
})

</script>
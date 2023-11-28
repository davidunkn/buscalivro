import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/useApi"

export interface Place {
    id: string | null
    name: string | null
    address: string | null
    lng: Number | 0
    lat: Number | 0
}

export interface Feedback {
    user: String | null
    place: String | null
    message: string | null
    rating: Number | 0
}

export interface State {
    place: Place
    feedback: Feedback
}


export const usePlaceStore = defineStore('place', {
    state: (): State => {
        return {
            place: {} as Place,
            feedback: {} as Feedback
        }
    },

    getters: {
        placeDetail: (state: State) => state.place,
        feedbackDetail: (state: State) => state.feedback
    },

    actions: {

        async getAllPlaces() {
            try {
                const { data } = await useApi().get(`/api/place`)
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },
        async getPlaceInfoById(id: String) {
            try {
                const { data } = await useApi().get(`/api/places/${id}`)
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },

        async getAllFeedbacks(id: String) {
            try {
                const { data } = await useApi().get(`/api/feedback/${id}`)
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },

        async addFeedback(id: String, payload: Feedback){
            try {
                const { data } = await useApiPrivate().post(`/api/feedback/${id}`, payload)
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },

    }

})
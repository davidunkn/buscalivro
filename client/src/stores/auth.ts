import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/useApi"

export interface User {
    id: string | null
    userId: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
}

export interface State {
    user: User
    accessToken: string | null
}

export interface LoginData {
    email: string | null
    password: string | null
}

export interface RegisterData {
    email: string | null
    password: string | null
    passwordConfirm: string | null
    firstName: string | null
    lastName: string | null
}


export const useAuthStore = defineStore('auth', {
    state: (): State => {
        return {
            user: {} as User,
            accessToken: "" as string,
        }
    },

    getters: {
        userDetail: (state: State) => state.user,
        isAuthenticated: (state: State) => state.accessToken ? true : false
    },

    actions: {

        async attempt() {
            try {
                await this.refresh()
                await this.getUser()
            } catch (error) {
                return
            }
            return
        },

        async login(payload: LoginData) {
            try {
                const { data } = await useApi().post('/api/auth/login', payload)
                this.accessToken = data.accessToken
                await this.getUser()
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },

        async register(payload: RegisterData) {
            try {
                const { data } = await useApi().post('/api/auth/register', payload)
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },

        async getUser() {
            try {
                const { data } = await useApiPrivate().get('/api/auth/user')
                this.user = data
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },

        async logout() {
            try {
                const { data } = await useApiPrivate().post('/api/auth/logout')
                this.accessToken = ""
                this.user = {} as User
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        },

        async refresh() {
            try {
                const { data } = await useApi().post('/api/auth/refresh')
                this.accessToken = data.accessToken
                return data
            } catch (error: Error | any) {
                throw new Error(error.response.data.message)
            }
        }
    }



})
import { axiosInstance, axiosInstancePrivate } from "../utils/axios"
import { useAuthStore } from "../stores/auth"
import { watchEffect } from "vue"
import type { AxiosInstance } from "axios";

export function useApiPrivate(): AxiosInstance {

    const authStore = useAuthStore()

    watchEffect(() => {
        axiosInstancePrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${authStore.accessToken}`
                }

                return config
            },
            (error) => Promise.reject(error)
        )

        axiosInstancePrivate.interceptors.response.use(
            response => response,
            async (error) => {

                const prevRequest = error?.config

                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest.sent) {
                    prevRequest.sent = true
                    try {
                        await authStore.refresh()
                        prevRequest.headers["Authorization"] = authStore.accessToken
                        return axiosInstancePrivate(prevRequest)
                    } catch (error) {
                        return Promise.reject(error)
                    }
                }

                return Promise.reject(error)
            }
        )

    })

    return axiosInstancePrivate
}

export function useApi() {
    return axiosInstance
}
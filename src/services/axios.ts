import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Store from '@/store'
import router from '@/router'

const isWindow = Object.keys(window).length > 0
let isProductionServer = true

if (isWindow)
    isProductionServer = !window.location.origin.includes('local')

const baseURL: string = isWindow && !isProductionServer
    ? process.env.VUE_APP_ROOT_API as string
    : process.env.VUE_APP_PROD_ROOT_API as string

const config: AxiosRequestConfig = {
    baseURL,
}

const instance = axios.create(config)

// Request interceptor
instance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = Store.getters['root/getToken']

    if (token && token !== 'null') {
        request.headers.common['Authorization'] = `Bearer ${token}`
    }

    return request
})

// Response.interceptor
instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => response, (error: AxiosError): AxiosError => {

    if (error.response?.status == 401 || error.response?.status == 403) {
        Store.dispatch('root/resetUser')
        router.push({ name: 'login' })
    }

    else if ([422, 400].includes(error.response?.status || 0)) {
        Store.commit('root/SET_ERROR_MESSAGE', error.response?.data?.errors)
    }

    return error
})

export default instance
export { baseURL }
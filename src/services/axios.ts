import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Store from '@/store'
import router from '@/router'

const isWindow = Object.keys(window).length > 0
let isProductionServer = true

if (isWindow)
    isProductionServer = !window.location.origin.includes('local')

const config: AxiosRequestConfig = {
    baseURL: isWindow && isProductionServer ? process.env.VUE_APP_PROD_ROOT_API : process.env.VUE_APP_ROOT_API,
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
instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => response, (error: AxiosError): Promise<AxiosError> => {

    if (error.response?.status == 403) {
        Store.dispatch('root/resetUser')
        router.push({ name: 'login' })
    }

    return new Promise((resolve, reject) => {
        reject(error.response?.data)
    })
})

export default instance
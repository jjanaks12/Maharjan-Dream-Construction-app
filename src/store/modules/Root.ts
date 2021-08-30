import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { resetPassword, iLogin, iUserDetail, iErrorMessage, iPassword, resedEmail } from "@/interfaces/auth"
import axios from '@/services/axios'

@Module
export default class Root extends VuexModule {
    private errors: iErrorMessage = {}
    private token: string = ''
    private currentPage: string = 'realstate'
    private userDetail: iUserDetail = {
        address: '',
        email: '',
        name: '',
        phone: '',
    }

    get getLoggedinUser(): iUserDetail | null {
        return this.userDetail
    }

    get getToken(): string | null {
        return this.token
    }

    get getErrorMessage() {
        return this.errors
    }

    get getCurrentPage(): string {
        return this.currentPage
    }

    @Mutation
    SET_LOGIN_USER(userDetail: iUserDetail): void {
        this.userDetail = userDetail
    }

    @Mutation
    SET_ERROR_MESSAGE(errorMessage: iErrorMessage): void {
        this.errors = errorMessage
    }

    @Mutation
    SET_CURRENT_PAGE(current: string): void {
        this.currentPage = current
    }

    @Mutation
    SET_TOKEN(token: string): void {
        this.token = token
    }

    @Action
    updatePageName(current: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.context.commit('SET_CURRENT_PAGE', current)
            resolve(true)
        })
    }

    @Action({ commit: 'SET_TOKEN' })
    async login(formData: iLogin) {
        const { data }: AxiosResponse = await axios.post('user/login', formData)
        return data.token
    }

    @Action
    async register(formData: iUserDetail): Promise<boolean> {
        return await axios.post('users', {
            url: location.origin + '/verification',
            data: formData
        })
    }

    @Action
    logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            axios.get('user/logout')
                .then(() => {
                    this.context.dispatch('resetUser')
                    resolve(true)
                })
                .catch((error: iErrorMessage) => {
                    this.context.commit('SET_ERROR_MESSAGE', error?.errors)
                    reject(false)
                })
        })
    }

    @Action({ commit: 'SET_LOGIN_USER' })
    async fetchUser() {
        if (this.token) {
            const { data } = await axios.get(`auth_user`)
            return data
        }
    }

    @Action
    changePassword({ id, old_password, password }: iPassword): Promise<boolean> {
        return new Promise((resolve, reject) => {

            axios.post(`users/${id}/password/update`, {
                old_password,
                password
            })
                .then(() => {
                    resolve(true)
                })
                .catch((error: iErrorMessage) => {
                    this.context.commit('SET_ERROR_MESSAGE', error?.errors)
                    reject(false)
                })
        })
    }

    @Action
    async forgotPassword(email: string): Promise<boolean> {
        const { data }: AxiosResponse = await axios.post(`password/email`, {
            email,
            url: location.origin + '/reset'
        })
        return data
    }

    @Action
    async resetPassword(formData: resetPassword) {
        const { data }: AxiosResponse = await axios.post('password/reset', formData)
        return data
    }

    @Action
    async resendEmail(formData: resedEmail) {
        const { data } = await axios.post('users/resend_verification_email', formData)
        return data
    }

    @Action
    async verifyEmail(formData: resedEmail) {
        const { data } = await axios.post('users/verify_email', formData)
        return data
    }

    @Action
    save(formData: iUserDetail) {
        axios.put(`users/${formData.uuid}`, formData)
            .then(() => {
                this.context.dispatch('fetchUser')
            })
    }

    @Action
    resetUser(): Promise<boolean> {
        return new Promise((resolve) => {
            this.context.commit('SET_CURRENT_PAGE', 'realstate')
            this.context.commit('SET_TOKEN', null)
            this.context.commit('SET_LOGIN_USER', {})
            this.context.dispatch('cart/resetCart', null, { root: true })

            resolve(true)
        })
    }
}
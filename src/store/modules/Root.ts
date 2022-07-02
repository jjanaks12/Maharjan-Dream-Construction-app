import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { resetPassword, iLogin, iUserDetail, iErrorMessage, iPassword, resedEmail } from "@/interfaces/auth"
import { iSearch } from '@/interfaces/search';
import axios from '@/services/axios'
import { iDelivery } from "@/interfaces/delivery";

@Module
export default class Root extends VuexModule {
    private showMenu: boolean = false
    private showSearch: boolean = false
    private errors: iErrorMessage = {}
    private token: string = ''
    private currentPage: string = 'realstate'
    private searchHistory: Array<iSearch> = []
    private delivery: Array<iDelivery> = []
    private userDetail: iUserDetail = {
        address: '',
        email: '',
        name: '',
        phone: '',
    }

    get isMenuActive(): boolean {
        return this.showMenu
    }

    get isSearchActive(): boolean {
        return this.showSearch
    }

    get getLoggedinUser(): iUserDetail | null {
        return this.userDetail
    }

    get isLoggedIn(): boolean {
        return Boolean(this.token) && (this.token !== 'null') && (this.token !== 'undefined')
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

    get historyList(): Array<iSearch> {
        return this.searchHistory
    }

    get deliveryType(): Array<iDelivery> {
        return this.delivery
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

    @Mutation
    UPDATE_MENU(status: boolean = false): void {
        this.showMenu = status
    }

    @Mutation
    UPDATE_SEARCH(status: boolean = false): void {
        this.showSearch = status
    }

    @Mutation
    ADD_TO_HISTORY_LIST(search: iSearch): void {
        const a: iSearch | undefined = this.searchHistory.find((s: iSearch) => search.title === s.title && search.type === s.type)

        if (!a)
            this.searchHistory.unshift({
                id: this.searchHistory.length + 1,
                ...search
            })
    }

    @Mutation
    REMOVE_SEARCH(id: number): void {
        const index = this.searchHistory.indexOf(this.searchHistory.find((history: iSearch) => id === history.id) as iSearch)

        this.searchHistory.splice(index, 1)
    }

    @Mutation
    CLEAR_HISTORY(): void {
        this.searchHistory = []
    }

    @Mutation
    SET_DELIVERY_TYPE(typeList: Array<iDelivery>) {
        this.delivery = typeList
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
        axios.put(`users/${formData.id}`, formData)
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
            this.context.commit('UPDATE_MENU', false)
            this.context.dispatch('cart/resetCart', null, { root: true })

            resolve(true)
        })
    }

    @Action({ commit: 'SET_DELIVERY_TYPE' })
    async fetchDeliveryType() {
        const { data }: AxiosResponse = await axios.get('deliveries')

        return data
    }
}
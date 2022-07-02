import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosError, AxiosResponse } from "axios"

import { iRent, iRentResponse, RequestQuery } from '@/interfaces/app'
import axios from '@/services/axios'
import { SearchType } from "@/interfaces/search"
import { iUserDetail } from "@/interfaces/auth"

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class Rent extends VuexModule {
    private tab: string = ''
    private loading: boolean = false
    private rentList: iRentResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get activeTab(): string {
        return this.tab
    }

    get getRentList(): Array<iRent> {
        return this.rentList.data
    }

    get total(): number {
        return this.rentList.total
    }

    get lastPage(): number {
        return this.rentList.last_page
    }

    get currentPage(): number {
        return this.rentList.current_page
    }

    get isLoading(): boolean {
        return this.loading
    }

    @Mutation
    SET_RENT_LIST(rentList: iRentResponse): void {
        this.rentList = rentList
    }

    @Mutation
    SET_ACTIVE_TAB(title: string) {
        this.tab = title
    }

    @Mutation
    SET_LOADING(status: boolean) {
        this.loading = status
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {
            this.context.commit('SET_LOADING', true)

            axios.get('rents', { ...data })
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_RENT_LIST', response.data)
                    resolve(true)
                })
                .finally(() => {
                    this.context.commit('SET_LOADING', false)
                })
        })
    }

    @Action
    nextPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage < this.lastPage) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentPage + 1
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    prevPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage > 1) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentPage - 1
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    gotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage >= 1) {
                params = {
                    params: {
                        ...params.params,
                        page: pageno
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    search(searchtext: string): Promise<boolean> {
        return new Promise((resolve) => {

            params = {
                params: {
                    name: searchtext
                }
            }
            this.context.commit('root/ADD_TO_HISTORY_LIST', {
                title: searchtext,
                type: SearchType.RENT
            }, {
                root: true
            })
            this.context.dispatch('fetch', params)
            resolve(true)
        })
    }

    @Action
    async getRent(id: number): Promise<iRent> {

        const { data } = await axios('rents/' + id)

        return data as iRent
    }

    @Action
    save(formData: iRent): Promise<boolean> {
        const { id: userID } = this.context.rootGetters['root/getLoggedinUser'] as iUserDetail

        return new Promise((resolve, reject) => {
            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `/rents/users/${userID}/edit` : `/rents/users/${userID}`,
                data: formData
            })
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                }).catch((error: AxiosError) => {
                    reject(error.response?.data)
                })
        })
    }

    @Action
    destory(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete('user/rents/delete/' + id)
                .then(() => {

                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch(() => { })
        })
    }

    @Action({ commit: 'SET_ACTIVE_TAB' })
    setActiveTab(title: string): string {
        return title
    }
}
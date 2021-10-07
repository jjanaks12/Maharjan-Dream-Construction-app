import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { iRent, iRentResponse, RequestQuery } from '@/interfaces/app'
import axios from '@/services/axios'
import { SearchType } from "@/interfaces/search"

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

const rentInit: iRent = {
    name: '',
    description: '',
    excerpt: '',
    machinery: '',
    price: ''
}

@Module
export default class Rent extends VuexModule {
    private rentList: iRentResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
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

    @Mutation
    SET_RENT_LIST(rentList: iRentResponse): void {
        this.rentList = rentList
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('rents', { ...data })
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_RENT_LIST', response.data)
                    resolve(true)
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

        if (this.rentList.data.length == 0)
            await this.context.dispatch('fetch')

        return await this.rentList.data.find((material: iRent) => material.id === id) || rentInit
    }
}
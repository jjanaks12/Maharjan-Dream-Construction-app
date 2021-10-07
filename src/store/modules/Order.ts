import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import { iOrder, orderInit } from "@/interfaces/order"
import axios from '@/services/axios'
import { APIResponse, RequestQuery } from "@/interfaces/app"

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class Order extends VuexModule {
    private orders: APIResponse<iOrder> = orderInit

    get list(): Array<iOrder> {
        return this.orders.data
    }

    get totalCount(): number {
        return this.orders.total
    }

    get lastPage(): number {
        return this.orders.last_page
    }

    get currentPage(): number {
        return this.orders.current_page
    }

    @Mutation
    SET_ORDER(orders: APIResponse<iOrder>) {
        this.orders = orders
    }

    @Action({ commit: 'SET_ORDER' })
    async fetch(query?: RequestQuery): Promise<APIResponse<iOrder>> {
        const parameter = { ...params.params, ...query }
        params = { params: parameter }
        
        const { data }: AxiosResponse = await axios.get('user/order', { params: parameter })

        return data
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
}
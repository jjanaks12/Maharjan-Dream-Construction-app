import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"
import axios from '@/services/axios'

import { iOrder, orderInit, OrderStatus } from "@/interfaces/order"
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

    @Action
    async getOrder(id: string) {
        if (this.list.length == 0)
            await this.context.dispatch('order/fetch', {}, { root: true })

        const order = this.list.find(o => o.id === id)

        return order as iOrder
    }

    @Action
    cancelOrder(order_id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            axios({
                method: "put",
                url: `orders/${order_id}/updateOrderStatus`,
                data: {
                    order_status: OrderStatus.CANCELLED
                }
            }).then(({ status }: AxiosResponse) => {

                if (status === 200)
                    this.context.dispatch('fetch')
                        .then(() => {
                            resolve(true)
                        })

            }).catch(() => {
                reject(false)
            })
        })
    }
}
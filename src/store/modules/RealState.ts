import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios";

import axios from '@/services/axios'
import { iErrorMessage } from '@/interfaces/auth'
import { iRealState, iRealStateResponse, RequestQuery } from '@/interfaces/app'
import { SearchType } from "@/interfaces/search";

const propertyInit: iRealState = {
    location: '',
    rate: '',
    unit: '',
    excerpt: '',
    description: '',
}

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class RealState extends VuexModule {
    private errors!: iErrorMessage
    private list: iRealStateResponse = {
        data: [],
        current_page: 5,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get getErrorMessage(): iErrorMessage | null {
        return this.errors
    }

    get getPropertyList(): Array<iRealState> {
        return this.list.data
    }

    get totalCount(): number {
        return this.list.total
    }

    get lastPage(): number {
        return this.list.last_page
    }

    get currentPage(): number {
        return this.list.current_page
    }

    @Mutation
    SET_ERROR_MESSAGE(errorMessage: iErrorMessage): void {
        this.errors = errorMessage
    }

    @Mutation
    SET_STATE_LIST(list: iRealStateResponse) {
        this.list = list
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve, reject) => {

            axios.get('realStates', { ...data })
                .then(({ data, status }: AxiosResponse) => {
                    if (status === 200)
                        this.context.commit('SET_STATE_LIST', data)
                    else
                        this.context.commit('SET_STATE_LIST', propertyInit)
                    resolve(true)
                })
                .catch((error: iErrorMessage) => {
                    this.context.commit('SET_ERROR_MESSAGE', error?.errors || { message: 'no data' })
                    reject(false)
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
    async getProperty(id: string): Promise<iRealState> {

        if (this.list.data.length == 0)
            await this.context.dispatch('fetch')

        return await this.list.data.find((material: iRealState) => material.id === id) || propertyInit
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
                    location: searchtext
                }
            }
            this.context.commit('root/ADD_TO_HISTORY_LIST', {
                title: searchtext,
                type: SearchType.REALSTATE
            }, {
                root: true
            })
            this.context.dispatch('fetch', params)

            resolve(true)
        })
    }
}
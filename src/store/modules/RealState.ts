import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios";

import axios from '@/services/axios'
import { iErrorMessage } from '@/interfaces/auth'
import { iRealState, iRealStateResponse, RequestQuery } from '@/interfaces/app'

const propertyInit: iRealState = {
    location: '',
    rate: '',
    unit: '',
    excerpt: '',
    description: '',
}

@Module
export default class RealState extends VuexModule {
    private errors!: iErrorMessage
    private list: iRealStateResponse = {
        data: [],
        current_page: 0,
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
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_STATE_LIST', response.data)
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

            this.context.dispatch('fetch', {
                params: {
                    page: this.currentPage + 1
                }
            })

            resolve(true)
        })
    }

    @Action
    async getProperty(id: number): Promise<iRealState> {

        if (this.list.data.length == 0)
            await this.context.dispatch('fetch')

        return await this.list.data.find((material: iRealState) => material.id === id) || propertyInit
    }
}
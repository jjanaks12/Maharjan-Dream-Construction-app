import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosError, AxiosResponse } from "axios";

import axios from '@/services/axios'
import { iErrorMessage, iUserDetail } from '@/interfaces/auth'
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
    private tab: string = ''
    private errors!: iErrorMessage
    private list: iRealStateResponse = {
        data: [],
        current_page: 5,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get activeTab(): string {
        return this.tab
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

    @Mutation
    SET_ACTIVE_TAB(title: string) {
        this.tab = title
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

        const { data } = await axios('realStates/' + id)

        return data
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

    @Action
    save(formData: iRealState): Promise<boolean> {
        const { id: userID } = this.context.rootGetters['root/getLoggedinUser'] as iUserDetail

        return new Promise((resolve, reject) => {
            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `/realStates/users/${userID}/edit` : `/realStates/users/${userID}`,
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
    deleteImage(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete(`realStates/image/${id}`)
            resolve(true)
        })
    }

    @Action
    destory(id: number): Promise<boolean> {
        return new Promise((resolve) => {

            axios.delete('user/realStates/delete/' + id)
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
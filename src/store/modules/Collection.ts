import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import axios from "@/services/axios"

import { iErrorMessage } from "@/interfaces/auth"
import { iCollection, iCollectionResponse } from "@/interfaces/collection"
import { RequestQuery } from "@/interfaces/app"

@Module
export default class Collection extends VuexModule {
    private errors!: iErrorMessage
    private collection: iCollectionResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get getErrorMessage(): iErrorMessage | null {
        return this.errors
    }

    get list(): Array<iCollection> {
        return this.collection.data
    }

    get totalCount(): number {
        return this.collection.total
    }

    get lastPage(): number {
        return this.collection.last_page
    }

    get currentPage(): number {
        return this.collection.current_page
    }

    @Mutation
    SET_ERROR_MESSAGE(errorMessage: iErrorMessage): void {
        this.errors = errorMessage
    }

    @Mutation
    SET_STATE_LIST(list: iCollectionResponse) {
        this.collection = list
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve, reject) => {

            axios.get('collections', { ...data })
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
    save(formData: iCollection): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const method = formData.id ? 'put' : 'post'
            const url = formData.id ? `collections/${formData.id}` : 'collections'

            axios({
                method,
                url,
                data: formData
            })
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
                .catch((error: iErrorMessage) => {
                    this.context.commit('SET_ERROR_MESSAGE', error?.errors || { message: 'no data' })
                    reject(false)
                })
        })
    }

    @Action
    async addToCollection(payload: { id: string, realstate_id: string }) {
        const { data }: AxiosResponse = await axios.post('collections/add_to_collection', payload)
        this.context.dispatch('fetch')

        return data
    }

    @Action
    async destory(id: string) {
        const data = await axios.delete(`collections/${id}`)
        
        if (data)
            this.context.dispatch('fetch')
    }
}
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios";

import axios from '@/services/axios'
import { iErrorMessage } from '@/interfaces/auth'
import { RequestQuery, iMaterial, APIResponse } from '@/interfaces/app'
import { SearchType } from "@/interfaces/search";

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

const materialInit: iMaterial = {
    name: '',
    description: '',
    material_category_id: '',
    measurement_unit: '',
    price: 0,
    quantity: ''
}

@Module
export default class Material extends VuexModule {
    private errors!: iErrorMessage
    private materials: APIResponse<iMaterial> = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }

    get getErrorMessage(): iErrorMessage | null {
        return this.errors
    }

    get getList(): Array<iMaterial> {
        return this.materials.data
    }

    get totalCount(): number {
        return this.materials.total
    }

    get lastPage(): number {
        return this.materials.last_page
    }

    get currentPage(): number {
        return this.materials.current_page
    }

    @Mutation
    SET_ERROR_MESSAGE(errorMessage: iErrorMessage): void {
        this.errors = errorMessage
    }

    @Mutation
    SET_STATE_LIST(list: APIResponse<iMaterial>) {
        this.materials = list
    }

    @Action({ commit: 'SET_STATE_LIST' })
    async fetch(query: RequestQuery): Promise<APIResponse<iMaterial>> {
        const { data }: AxiosResponse = await axios.get('materials', { ...query })

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
                type: SearchType.MATERIAL
            }, {
                root: true
            })
            this.context.dispatch('fetch', params)

            resolve(true)
        })
    }

    @Action
    async getMaterial(id: string): Promise<iMaterial> {

        if (this.materials.data.length == 0)
            await this.context.dispatch('fetch')

        return await this.materials.data.find((material: iMaterial) => material.id === id) || materialInit
    }
}
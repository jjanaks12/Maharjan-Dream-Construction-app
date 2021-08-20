import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios";

import axios from '@/services/axios'
import { iErrorMessage } from '@/interfaces/auth'
import { RequestQuery, iMaterial, iMaterialResponse } from '@/interfaces/app'

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
    private materials: iMaterialResponse = {
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
    SET_STATE_LIST(list: iMaterialResponse) {
        this.materials = list
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve, reject) => {

            axios.get('materials', {
                params: {
                    ...data,
                    per_page: 10
                }
            })
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
            console.log(this.currentPage);


            this.context.dispatch('fetch', {
                page: this.currentPage + 1
            })

            resolve(true)
        })
    }

    @Action
    async getMaterial(id: number): Promise<iMaterial> {

        if (this.materials.data.length == 0)
            await this.context.dispatch('fetch')

        return await this.materials.data.find((material: iMaterial) => material.id === id) || materialInit
    }
}
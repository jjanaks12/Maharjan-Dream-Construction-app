import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import axios from '@/services/axios'
import { iUserDetail } from '@/interfaces/auth';
import { iTraining, iTrainingResponse, RequestQuery } from '@/interfaces/app'

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

const trainingInit: iTraining = {
    title: '',
    excerpt: '',
    description: '',
    duration: '',
    duration_type: '',
    price: '',
    start_date: '',
}

@Module
export default class Training extends VuexModule {
    private trainingList: iTrainingResponse = {
        data: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    }
    private erolledList: Array<any> = []

    get getTrainingList(): Array<iTraining> {
        return this.trainingList.data
    }

    get getErolledList() {
        return this.erolledList
    }

    get total(): number {
        return this.trainingList.total
    }

    get lastPage(): number {
        return this.trainingList.last_page
    }

    get currentPage(): number {
        return this.trainingList.current_page
    }

    @Mutation
    SET_TRAINING_LIST(trainingList: iTrainingResponse): void {
        this.trainingList = trainingList
    }

    @Mutation
    SET_ENROLLED_LIST(enrolledList: Array<any>): void {
        this.erolledList = enrolledList
    }

    @Action
    fetch(data: RequestQuery): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('trainings', { ...data })
                .then((response: AxiosResponse) => {
                    this.context.commit('SET_TRAINING_LIST', response.data)
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
                    title: searchtext
                }
            }
            this.context.dispatch('fetch', params)

            resolve(true)
        })
    }

    @Action
    async getTraining(id: number): Promise<iTraining> {

        if (this.trainingList.data.length == 0)
            await this.context.dispatch('fetch')

        return await this.trainingList.data.find((material: iTraining) => material.id === id) || trainingInit
    }

    @Action
    enroll({ id }: iTraining) {
        const { uuid }: iUserDetail = this.context.rootGetters['root/getLoggedinUser'] as iUserDetail

        axios.post(`users/${uuid}/trainings?training_id=${id}`)
            .then(async () => {
                await this.context.dispatch('fetchEnrolled')
                await this.context.dispatch('fetch')
            })
    }

    @Action({ commit: 'SET_ENROLLED_LIST' })
    async fetchEnrolled() {
        const { uuid }: iUserDetail = this.context.rootGetters['root/getLoggedinUser'] as iUserDetail

        if (uuid) {
            const { data }: AxiosResponse = await axios.get(`users/${uuid}/trainings`)
            return data
        }
    }

    @Action
    async isEnrolled({ id }: iTraining) {
        await this.context.dispatch('fetchEnrolled')

        return await this.erolledList.find((enroll) => enroll.training_id === id)
    }
}
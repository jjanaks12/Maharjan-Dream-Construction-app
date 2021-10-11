import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import axios from '@/services/axios'
import { iDeskResponse, iDesk, iMenu, iMenuResponse } from '@/interfaces/resturant'
import { RequestQuery } from '@/interfaces/app'
import { AxiosResponse } from 'axios'

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

const resturantInit: iMenu = {
    name: '',
    price: '',
    description: '',
    excerpt: '',
    quantity: 0,
}

@Module
export default class Resturant extends VuexModule {
    private desk: iDeskResponse = {
        data: [],
        current_page: 0,
        per_page: 0,
        last_page: 0,
        total: 0
    }
    private menu: iMenuResponse = {
        data: [],
        current_page: 0,
        per_page: 0,
        last_page: 0,
        total: 0
    }

    get getDeskList(): Array<iDesk> {
        return this.desk.data
    }

    get totalDeskPage(): number {
        return this.desk.total
    }

    get lastDeskPage(): number {
        return this.desk.last_page
    }

    get currentDeskPage(): number {
        return this.desk.current_page
    }

    get getMenuList(): Array<iMenu> {
        return this.menu.data
    }

    get totalMenuPage(): number {
        return this.menu.total
    }

    get lastMenuPage(): number {
        return this.menu.last_page
    }

    get currentMenuPage(): number {
        return this.menu.current_page
    }

    @Mutation
    SET_DESK(deskResponse: iDeskResponse) {
        this.desk = deskResponse
    }

    @Mutation
    SET_MENU(menuResponse: iMenuResponse) {
        this.menu = menuResponse
    }

    @Action({ commit: 'SET_DESK' })
    async deskFetch(data: RequestQuery = { params: { per_page: 10 } }) {
        const { data: responseData } = await axios.get('desk', { ...data })
        return responseData
    }

    @Action({ commit: 'SET_MENU' })
    async menuFetch(data: RequestQuery = { params: { per_page: 10 } }) {
        const { data: responseData } = await axios.get('menus', { ...data })
        return responseData
    }

    @Action
    nextDeskPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentDeskPage < this.lastDeskPage) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentDeskPage + 1
                    }
                }
                this.context.dispatch('deskFetch', params)
            }

            resolve(true)
        })
    }

    @Action
    prevDeskPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentDeskPage > 1) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentDeskPage - 1
                    }
                }
                this.context.dispatch('deskFetch', params)
            }

            resolve(true)
        })
    }

    @Action
    deskGotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentDeskPage >= 1) {
                params = {
                    params: {
                        ...params.params,
                        page: pageno
                    }
                }
                this.context.dispatch('deskFetch', params)
            }

            resolve(true)
        })
    }

    @Action
    deskSearch(searchtext: string): Promise<boolean> {
        return new Promise((resolve) => {

            params = {
                params: {
                    name: searchtext
                }
            }
            this.context.dispatch('deskFetch', params)

            resolve(true)
        })
    }

    @Action
    nextMenuPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentMenuPage < this.lastMenuPage) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentMenuPage + 1
                    }
                }
                this.context.dispatch('menuFetch', params)
            }

            resolve(true)
        })
    }

    @Action
    prevMenuPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentMenuPage > 1) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentMenuPage - 1
                    }
                }
                this.context.dispatch('menuFetch', params)
            }

            resolve(true)
        })
    }

    @Action
    menuGotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentMenuPage >= 1) {
                params = {
                    params: {
                        ...params.params,
                        page: pageno
                    }
                }
                this.context.dispatch('menuFetch', params)
            }

            resolve(true)
        })
    }

    @Action
    menuSearch(searchtext: string): Promise<boolean> {
        return new Promise((resolve) => {

            params = {
                params: {
                    name: searchtext
                }
            }
            this.context.commit('root/ADD_TO_HISTORY_LIST', {
                title: searchtext,
                type: 'resturant'
            }, {
                root: true
            })
            this.context.dispatch('menuFetch', params)

            resolve(true)
        })
    }

    @Action
    async getMenu(id: string): Promise<iMenu> {
        const { data }: AxiosResponse = await axios.get(`menus/${id}`)
        return data
    }
}
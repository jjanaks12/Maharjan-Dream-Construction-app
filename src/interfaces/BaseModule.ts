import { Module, Mutation, VuexModule } from "vuex-module-decorators"
import { APIResponse } from "./app"

@Module
export default class BaseModule<T> extends VuexModule {
    private items: APIResponse<T> = {
        data: [],
        current_page: 0,
        per_page: 0,
        last_page: 0,
        total: 0,
    }

    get list(): Array<T> {
        return this.items.data
    }

    get totalCount(): number {
        return this.items.total
    }

    get lastPage(): number {
        return this.items.last_page
    }

    get currentPage(): number {
        return this.items.current_page
    }

    @Mutation
    SET_ITEM(orders: APIResponse<T>) {
        this.items = orders
    }
}
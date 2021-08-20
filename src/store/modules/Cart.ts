import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"

// import axios from '@/services/axios'
import { iMaterial, iCart } from "@/interfaces/app"

@Module
export default class Cart extends VuexModule {
    private list: Array<iCart> = []

    get getList(): Array<iCart> {
        return this.list
    }

    get count(): number {
        return this.list.length
    }

    @Mutation
    ADD_TO_CART(item: iMaterial) {
        const cartItem: iCart | undefined = this.list.find((ci: iCart) => ci.material.id === item.id)

        if (cartItem)
            cartItem.quantity++
        else {
            this.list.push(({
                id: this.list.length + 1,
                quantity: 1,
                material: item
            } as iCart))
        }
    }

    @Mutation
    REMOVE_ITEM(index: number) {
        this.list.splice(index, 1)
    }

    @Action
    addToCart(item: iMaterial): Promise<boolean> {
        return new Promise((resolve) => {
            this.context.commit('ADD_TO_CART', item)
            resolve(true)
        })
    }

    @Action
    removeFromCart(id: number): Promise<boolean> {
        return new Promise((resolve) => {
            const ci: iCart | undefined = this.list.find((item: iCart) => item.id === id)

            if (ci) {
                const index = this.list.indexOf(ci)

                if (index >= 0) {
                    this.context.commit('REMOVE_ITEM', index)
                }
            }
            resolve(true)
        })
    }
}
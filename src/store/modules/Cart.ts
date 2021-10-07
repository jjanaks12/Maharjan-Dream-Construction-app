import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"

import axios from '@/services/axios'
import { formData, iCart } from '@/interfaces/cart';
import { iMaterial } from "@/interfaces/app"

@Module
export default class Cart extends VuexModule {
    private list: Array<iCart> = []

    get getList(): Array<iCart> {
        return this.list
    }

    get count(): number {
        return this.list.length
    }

    get totalAmount(): number {
        return this.list.reduce((acc: number, item: iCart) => acc + (item.quantity * item.material.price), 0)
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
    INCREASE_QUANTITY({ id }: iCart) {
        const cartItem: iCart | undefined = this.list.find((item: iCart) => item.id === id)

        if (!cartItem)
            return

        cartItem.quantity++
    }

    @Mutation
    REDUCE_QUANTITY({ id }: iCart) {
        const cartItem: iCart | undefined = this.list.find((item: iCart) => item.id === id)

        if (!cartItem)
            return

        if (cartItem.quantity > 1) {
            cartItem.quantity--
        } else {
            const index = this.list.indexOf(cartItem)

            if (index >= 0) {
                this.list.splice(index, 1)
            }
        }
    }

    @Mutation
    REMOVE_ITEM(index: number) {
        this.list.splice(index, 1)
    }

    @Mutation
    RESET_CART() {
        this.list = []
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

    @Action({ commit: 'RESET_CART' })
    async makeOrder(formData: formData) {
        const materialList: { [PropName: string]: number } = this.getList.reduce((acc, currentValue: iCart) => Object.assign(acc, { [currentValue.material?.id as string]: currentValue.quantity }), {})

        const { status } = await axios.post('/user/order', {
            material: formData.type == 'material' ? materialList : null,
            ...formData
        })

        if (status === 200) {
            this.context.dispatch('order/fetch', {}, { root: true })
            return true
        }

        return false
    }

    @Action({ commit: 'RESET_CART' })
    resetCart() {
        this.context.dispatch('order/fetch', null, { root: true })
        return true
    }
}


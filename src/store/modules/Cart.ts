import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"

// import axios from '@/services/axios'
import { iCart } from '@/interfaces/cart';
// import { iUserDetail } from '@/interfaces/auth';
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
    INCREASE_QUANTITY({ id }: iMaterial) {
        const cartItem: iCart | undefined = this.list.find((item: iCart) => item.id === id)

        if (!cartItem)
            return

        cartItem.quantity++
    }

    @Mutation
    REDUCE_QUANTITY({ id }: iMaterial) {
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

    // @Action({ commit: 'RESET_CART' })
    @Action
    async makeOrder() {
        /*
        const { uuid }: iUserDetail = this.context.rootGetters['root/getLoggedinUser'] as iUserDetail

        const formData = this.list.reduce((acc: Array<dataObject>, item: iCart) => acc.push({
            type: 'material',
            product_id: item.material.id,
            delivery_address: ''
            // [item.material.id as number]: item.quantity
        }), [])
        console.log(uuid, formData);
        // const { data } = await axios.post('/order', formData)

        // return data
        */
    }

    @Action({ commit: 'RESET_CART' })
    resetCart() {
        return true
    }
}


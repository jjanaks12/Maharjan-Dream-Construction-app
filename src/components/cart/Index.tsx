import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iCart } from '@/interfaces/cart'
import CartItem from './Item'

@Component({
    computed: {
        ...mapGetters({
            noOfItem: 'cart/count',
            list: 'cart/getList',
            totalAmount: 'cart/totalAmount'
        })
    },
    methods: {
        ...mapActions({
            makeOrder: 'cart/makeOrder'
        })
    }
})
export default class Cart extends Vue {
    private noOfItem!: number
    private list!: Array<iCart>
    private totalAmount!: number
    private makeOrder!: () => void

    constructor(props: any) {
        super(props)
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<section class="cart">
            {this.noOfItem > 0 ? this.noEmptyCart() : this.emptyCart()}
        </section>)
    }

    emptyCart(): VNode {
        return (<div class="cart__empty">
            <p>no items in cart</p>
        </div>)
    }

    noEmptyCart() {
        return [
            <header class="cart__header">
                <strong class="cart__title">Cart</strong>
                {
                    this.noOfItem > 0 && this.$route.name !== 'order' ?
                        <router-link to={{ name: 'order' }} class="btn btn__xs btn__primary">Place order</router-link>
                        : null
                }
            </header>,
            <div class="cart__list">
                {this.list.map((item: iCart) => (<CartItem item={item} />))}
            </div>,
            <div class="cart__footer">
                <strong>Total Amount</strong>
                <em>Rs. {this.totalAmount}</em>
            </div>
        ]
    }
}

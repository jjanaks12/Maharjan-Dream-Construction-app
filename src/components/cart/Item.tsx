import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapActions, mapMutations } from 'vuex'

import { iCart } from '@/interfaces/cart'

@Component({
    methods: {
        ...mapActions({
            removeItem: 'cart/removeFromCart'
        }),
        ...mapMutations({
            increaseQuatity: 'cart/INCREASE_QUANTITY',
            reduceQuatity: 'cart/REDUCE_QUANTITY'
        })
    }
})
export default class CartItem extends Vue {
    private removeItem!: (id: number) => Promise<boolean>
    private reduceQuatity!: (item: iCart) => void
    private increaseQuatity!: (item: iCart) => void

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iCart

    get price(): number {
        return this.item.quantity * this.item.material.price
    }

    get image(): string {
        return this.item.material.images && this.item.material.images.length > 0 ? this.item.material.images[0].image_url : ''
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="cart__item">
            <div class="cart__item__image">
                <img src={this.image} alt="" />
            </div>
            <div class="cart__item__detail">
                <router-link to={{ name: 'material_detail', params: { id: this.item.material.id } }}>{this.item.material.name} <span>({this.item.quantity})</span></router-link>
                <em>Rs. {this.price}</em>
            </div>
            <div class="cart__item__action">
                <a href="#" class="btn btn__xs btn__success" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.increaseQuatity(this.item)
                }}>+</a>
                <a href="#" class="btn btn__xs btn__primary" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.reduceQuatity(this.item)
                }}>-</a>
                <a href="#" class="btn btn__danger btn__xs" onClick={(event: MouseEvent) => { event.preventDefault(); this.removeItem(this.item.id) }}><span class="icon-trash" /></a>
            </div>
        </div>)
    }
}

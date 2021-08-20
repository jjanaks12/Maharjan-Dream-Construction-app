import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iCart } from '@/interfaces/app'
import { mapActions } from 'vuex'

@Component({
    methods: {
        ...mapActions({
            removeItem: 'cart/removeFromCart'
        })
    }
})
export default class CartItem extends Vue {
    private removeItem!: (id: number) => Promise<boolean>

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iCart

    get price(): number {
        return this.item.quantity * this.item.material.price
    }

    get image(): string {
        return this.item.material.images && this.item.material.images.length > 0 ? this.item.material.images[0].url : ''
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
                <a href="#" class="btn btn__danger btn__xs" onClick={(event: MouseEvent) => { event.preventDefault(); this.removeItem(this.item.id) }}>remove</a>
            </div>
        </div>)
    }
}

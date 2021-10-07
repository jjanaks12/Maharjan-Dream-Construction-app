import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapGetters } from "vuex"

import Cart from "@/components/cart/Index"
import OrderForm from "@/components/order/Form"
import Modal from "@/components/common/Modal"
import OrderList from "@/components/order/Index"

@Component({
    computed: {
        ...mapGetters({
            cartCount: 'cart/count'
        })
    }
})
export default class Order extends Vue {
    private showModal: boolean = false

    private cartCount!: number

    render(): VNode {
        return <main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Order</h2>
                    {this.cartCount > 0
                        ? <a class="btn btn__xs btn__success" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.showModal = true
                        }}>place your order</a>
                        : null}
                </header>
                <Cart />
                <OrderList />
                <Modal v-model={this.showModal}>
                    <OrderForm onClose={() => this.showModal = false} />
                </Modal>
            </section>
        </main>
    }
}
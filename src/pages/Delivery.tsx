import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"

import Cart from "@/components/cart/Index"
import OrderForm from "@/components/order/Form"

@Component
export default class Delivery extends Vue {
    render(): VNode {
        return <main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Delivery</h2>
                </header>
                <Cart />
                <OrderForm />
            </section>
        </main>
    }
}
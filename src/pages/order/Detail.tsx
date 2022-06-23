import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mapActions } from 'vuex'
import Slick from 'vue-slick'

import { iOrder, OrderStatus } from '@/interfaces/order'
import OrderProgress from '@/components/order/Status'
import MaterialCard from '@/components/material/Card'
import { iMaterial } from '@/interfaces/app'
import { formatDate } from '@/plugins/filter'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true
}

@Component({
    methods: {
        ...mapActions({
            getOrder: 'order/getOrder',
            cancelOrder: 'order/cancelOrder'
        })
    }
})
export default class OrderDetail extends Vue {
    private order: iOrder = {} as iOrder
    private isLoading: boolean = false

    private getOrder!: (id: string) => Promise<iOrder>
    private cancelOrder!: (id: string) => Promise<boolean>

    mounted() {
        this.init()
    }

    render(): VNode {
        return <section class="item__section">
            <header class="item__section__heading">
                <h1 class="h2">Order Detail</h1>
                <div class="item__action">
                    <a href="#" class="btn btn__icon" onClick={(event: MouseEvent) => {
                        event.preventDefault()

                        this.init()
                    }}><span class={{ "icon-loop": true, "animate": this.isLoading }}></span></a>
                    {/* Back to detail Page */}
                    <a href="#" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.$router.go(-1)
                    }} class="back"><span class="icon-d-arrow-left"></span></a>
                </div>
            </header>
            <div class="item__description">
                {/* Materials on Order */}
                {this.order.material
                    ? [<h2 class="h4">Items</h2>,
                    <Slick class="item__slider" options={slickOpt} style="margin-bottom: 40px">
                        {this.order.material.map((material: iMaterial) => <MaterialCard item={material} key={material.id} />)}
                    </Slick>]
                    : null}

                {/* Order progress */}
                <h2 class="h4">Order status</h2>
                <OrderProgress current-status={this.order.order_status} style="margin-bottom: 40px" />
            </div>
            <footer class="item__section__footer">
                {this.order.delivery_date
                    ? <em class="item__date">
                        <strong>{this.order.delivery_date}</strong>
                        {formatDate(this.order.delivery_date)}
                    </em>
                    : null}
                {this.order.order_status !== OrderStatus.CANCELLED
                    ? <a href="#" class="btn btn__danger" onClick={(event: MouseEvent) => {
                        event.preventDefault()

                        this.cancelOrder(this.order.id || '')
                            .then(() => {
                                this.init()
                            })
                    }}>Cancel Order</a>
                    : null}
            </footer>
        </section>
    }

    async init() {
        this.isLoading = true
        this.order = await this.getOrder(this.$route.params.id)
        this.isLoading = false
    }
}
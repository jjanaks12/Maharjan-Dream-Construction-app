import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import Slick from 'vue-slick'

import { iOrder } from '@/interfaces/order'
import OrderItem from '@/components/order/Item'
import Paginate from '@/components/common/Paginate'
import Modal from '@/components/common/Modal'
import OrderForm from '@/components/order/Form'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true
}

@Component({
    computed: {
        ...mapGetters({
            list: 'order/list',
            current: 'order/currentPage',
            total: 'order/lastPage',
            cartCount: 'cart/count'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'order/fetch',
            next: 'order/nextPage',
            prev: 'order/prevPage',
        })
    }
})
export default class Order extends Vue {
    private showModal: boolean = false
    private isLoading: boolean = false
    private list!: Array<iOrder>
    private current!: number
    private total!: number

    private cartCount!: number
    private fetch!: () => Promise<boolean>
    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>

    beforeMount() {
        this.getOrder()
    }

    render(): VNode {
        return <section class="item__section">
            <header class="item__header">
                <h2>My orders</h2>
                <div class="item__action">
                    {this.cartCount > 0
                        ? <a class="btn btn__xs btn__success" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.showModal = true
                        }}>place your order</a>
                        : null}
                    <a href="#" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.getOrder()
                    }}><span class={{ "icon-loop d-inline-block": true, animate: this.isLoading }}></span></a>
                </div>
            </header>
            {!this.isLoading
                ? [
                    <Slick class="item__slider" options={slickOpt}>
                        {this.list.map((order: iOrder) => <OrderItem order={order} />)}
                    </Slick>,
                    <Paginate current={this.current} total={this.total} onNext={() => this.next()} onPrev={() => this.prev()} />
                ]
                : null}
            <Modal v-model={this.showModal} {...{
                scopedSlots: {
                    header: (): VNode => <h2>Ready to checkout?</h2>
                }
            }}>
                <OrderForm onClose={() => this.showModal = false} />
            </Modal>
        </section>
    }

    getOrder() {
        this.isLoading = true

        this.fetch()
            .finally(() => {
                this.isLoading = false
            })
    }
}
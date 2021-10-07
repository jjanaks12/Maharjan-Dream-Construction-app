import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iOrder } from '@/interfaces/order'
import Paginate from '../common/Paginate'
import OrderItem from './Item'

@Component({
    computed: {
        ...mapGetters({
            list: 'order/list',
            current: 'order/currentPage',
            total: 'order/lastPage',
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
export default class OrderList extends Vue {
    private list!: Array<iOrder>
    private current!: number
    private total!: number

    private fetch!: () => Promise<boolean>
    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>

    async mounted() {
        await this.fetch()
    }

    render(): VNode {
        return <section class="item__section">
            <header class="item__section__heading">
                <h2 class="h4">Previous orders</h2>
            </header>
            {this.list.map((order: iOrder) => <OrderItem order={order} />)}
            <Paginate current={this.current} total={this.total} onNext={() => this.next()} onPrev={() => this.prev()} />
        </section>
    }
}
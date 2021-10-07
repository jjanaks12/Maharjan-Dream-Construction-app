import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iOrder } from '@/interfaces/order'
import OrderProgress from './Status'
import moment from 'moment'

@Component
export default class OrderItem extends Vue {
    @Prop({ required: true }) order!: iOrder

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <div class="item">
            <div class="item__description">
                <em class="item__date">{moment(this.order.ordered_at).local().format('Do [of] MMM, YYYY hh:mm a')}</em>
                {this.order.delivery_date
                    ? <em class="item__delivery_date">Will be deliveried on <span>{moment(this.order.delivery_date).format('Do [of] MMM, YYYY')}</span></em>
                    : null}
                <OrderProgress current-status={this.order.order_status} />
            </div>
            {/* <a href="#" class="item__link"><span class="icon-d-arrow"></span></a> */}
        </div>
    }
}
import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"

import { OrderStatus } from "@/interfaces/order"

@Component
export default class OrderProgress extends Vue {
    @Prop({ required: true }) currentStatus!: string

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <ul class="order__status">
            {Object.values(OrderStatus).map((status: string) => <li class={{ 'current': this.currentStatus == status, [status]: true }}>{status}</li>)}
        </ul>
    }
}
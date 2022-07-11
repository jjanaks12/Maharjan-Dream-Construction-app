import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import moment from 'moment'

import { iTraining } from '@/interfaces/app'

@Component
export default class RentItem extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iTraining

    get remainingDay(): number {
        return moment(this.item.start_date).diff(moment(), 'days')
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<router-link to={{ name: 'training_detail', params: { id: this.item.id } }} class="item">
            <div class="item__description">
                <h3>{this.item.title}</h3>
                <p>{this.item.excerpt}</p>
                {this.remainingDay > 0 ? <span>{this.remainingDay} day{this.remainingDay > 1 ? 's' : ''} left</span> : <span class="text--danger">expired</span>}
            </div>
        </router-link>)
    }
}

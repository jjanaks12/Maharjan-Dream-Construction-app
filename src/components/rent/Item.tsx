import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iRent } from '@/interfaces/app'

@Component
export default class RentItem extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iRent

    /**
     * @returns VNode
     */
    render(): VNode {
        return <router-link to={{ name: 'rent_detail', params: { id: this.item.id } }} class="item">
            <div class="item__description">
                <h3>{this.item.name}</h3>
                <p>{this.item.excerpt}</p>
            </div>
        </router-link>
    }
}

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
        return (<div class="item">
            <div class="item__description">
                <h3><router-link to={{ name: 'rent_detail', params: { id: this.item.id } }}>{this.item.name}</router-link></h3>
                <p>{this.item.excerpt}</p>
            </div>
            <a href="#" class="item__link"><span class="icon-d-arrow"></span></a>
        </div>)
    }
}

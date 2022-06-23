import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iRent } from '@/interfaces/app'

@Component
export default class RentCard extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iRent

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<router-link class="item__card" to={{ name: 'rent_detail', params: { id: this.item.id } }}>
            {/* <figure class="item__image">
            </figure> */}
            <div class="item__description">
                <h3>{this.item.name}</h3>
                <p>{this.item.excerpt}</p>
            </div>
        </router-link>)
    }
}

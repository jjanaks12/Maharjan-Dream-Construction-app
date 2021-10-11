import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMenu } from '@/interfaces/resturant'

@Component
export default class ResturantSubItem extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iMenu

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="item">
            <div class="item__description">
                <h3><router-link to={{ name: 'resturant_detail', params: { id: this.item.id } }}>{this.item.name}</router-link></h3>
                <p>{this.item.excerpt}</p>
            </div>
            <router-link to={{ name: 'resturant_detail', params: { id: this.item.id } }} class="item__link"><span class="icon-d-arrow"></span></router-link>
        </div>)
    }
}

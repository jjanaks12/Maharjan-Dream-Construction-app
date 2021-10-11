import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMaterial } from '@/interfaces/app'

@Component
export default class MaterialItem extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iMaterial

    get featuredImage(): string {
        return this.item.images && this.item.images.length > 0 ? this.item.images[0].image_url : ''
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="item">
            <div class="item__image"><img src={this.featuredImage} alt={this.item.name} /></div>
            <div class="item__description">
                <h3><router-link to={{ name: 'material_detail', params: { id: this.item.id } }}>{this.item.name}</router-link></h3>
                <p>{this.item.excerpt}</p>
            </div>
            <router-link to={{ name: 'material_detail', params: { id: this.item.id } }} class="item__link"><span class="icon-d-arrow"></span></router-link>
        </div>)
    }
}

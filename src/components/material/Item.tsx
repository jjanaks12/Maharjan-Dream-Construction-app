import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMaterial } from '@/interfaces/app'
import { abbr } from '@/core/functions'

@Component
export default class MaterialItem extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iMaterial

    get featuredImage(): string {
        return this.item.images && this.item.images.length > 0
            ? this.item.images[(Math.floor(Math.random() * this.item.images.length))].image_url
            : ''
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return <router-link to={{ name: 'material_detail', params: { id: this.item.id } }} class="item">
            <div class="item__image">
                {this.featuredImage
                    ? <img src={this.featuredImage} alt={this.item.name} />
                    : <span class="item__image--default">{abbr(this.item.name)}</span>}
            </div>
            <div class="item__description">
                <h3>{this.item.name}</h3>
                <em class="price"><strong>Rs{this.item.price}</strong> per piece</em>
                <span class="quantity">{this.item.quantity} piece in Stock</span>
                <p>{this.item.excerpt}</p>
            </div>
        </router-link>
    }
}

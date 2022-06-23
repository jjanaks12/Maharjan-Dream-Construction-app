import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"

import { iMaterial } from '@/interfaces/app'
import { abbr } from "@/core/functions"

@Component
export default class MaterialCard extends Vue {
    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iMaterial

    get featuredImage(): string {
        return this.item.images && this.item.images.length > 0
            ? this.item.images[(Math.floor(Math.random() * this.item.images.length))].image_url
            : ''
    }

    render(): VNode {
        return <router-link class="item__card" to={{ name: 'material_detail', params: { id: this.item.id } }}>
            <div class="item__image">
                {this.featuredImage
                    ? <img src={this.featuredImage} alt={this.item.name} />
                    : <span class="item__image--default">{abbr(this.item.name)}</span>}
            </div>
            <div class="item__description">
                <h3>{this.item.name}</h3>
                <p>{this.item.excerpt}</p>
                <em class="price">Rs<strong>{this.item.price}</strong> per piece</em>
            </div>
        </router-link>
    }
}
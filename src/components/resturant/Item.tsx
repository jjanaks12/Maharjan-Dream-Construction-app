import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iMenu } from '@/interfaces/resturant'

@Component
export default class ResturantItem extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iMenu

    get image(): string {
        return this.item.images && this.item.images.length > 0 ? this.item.images[0].image_url : ''
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="item">
            <div class="item__image">
                {this.image
                    ? <img src={this.image} alt={this.item.name} />
                    : <span class="icon-image" />}
            </div>
            <div class="item__description">
                <h3><router-link to={{ name: 'resturant_detail', params: { id: this.item.id } }}>{this.item.name}</router-link></h3>
                <p>{this.item.excerpt}</p>
            </div>
            <a href="#" class="item__link"><span class="icon-d-arrow"></span></a>
            {/* {this.item.children && this.item.children.length > 0
                ? <div class="space-y-1 pt-1">
                    {this.item.children.map((menuItem: iMenu, index: number) => <ResturantItem item={menuItem} class="ml-9" />)}
                </div>
                : null} */}
        </div>)
    }
}

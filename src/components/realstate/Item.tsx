import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import RealestateService from './Services'
import { iRealState } from '@/interfaces/app'

@Component
export default class RealestateItem extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iRealState

    get featuredImage(): string {
        return this.item.images && this.item.images.length > 0 ? this.item.images[0].image_url : ''
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="item">
            {this.featuredImage
                ? <div class="item__image">
                    <img src={this.featuredImage} alt={this.item.location} />
                </div>
                : null
            }
            <div class="item__description">
                <h3><router-link to={{ name: 'realstate_detail', params: { id: this.item.id } }}>{this.item.location}</router-link></h3>
                <p>{this.item.excerpt}</p>
                {this.item.detail ? (<RealestateService item={this.item.detail} />) : null}
            </div>
            <router-link to={{ name: 'realstate_detail', params: { id: this.item.id } }} class="item__link"><span class="icon-d-arrow"></span></router-link>
        </div>)
    }
}

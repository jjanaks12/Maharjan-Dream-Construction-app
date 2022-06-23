import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { iRealState } from '@/interfaces/app';

@Component
export default class RealStateCard extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iRealState

    get image(): string {
        return this.item.images && this.item.images.length > 0
            ? this.item.images[Math.floor(Math.random() * this.item?.images.length)]?.image_url
            : ''
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<router-link class="item__card" to={{ name: 'realstate_detail', params: { id: this.item.id } }}>
            <figure class="item__image">
                <img src={this.image} alt={this.item.location} />
            </figure>
            <div class="item__description">
                <h3>{this.item.location}</h3>
                <p>{this.item.excerpt}</p>
                <em>{this.item.rate} {this.item.unit}</em>
            </div>
        </router-link>)
    }
}
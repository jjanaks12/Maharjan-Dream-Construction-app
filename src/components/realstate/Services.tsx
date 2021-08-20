import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iService } from '@/interfaces/app'

@Component
export default class RealestateService extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iService

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="service__list">
            {this.item?.bedroom ? (<div class="service__item">
                <span class="icon-bed"></span>
                <span class="text">+{this.item?.bedroom}</span>
            </div>) : null}
            {this.item?.bathroom ? (<div class="service__item">
                <span class="icon-shower"></span>
                <span class="text">+{this.item?.bathroom}</span>
            </div>) : null}
            {this.item?.parking ? (<div class="service__item">
                <span class="icon-car"></span>
                <span class="text">+{this.item?.parking}</span>
            </div>) : null}
        </div>)
    }
}

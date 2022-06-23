import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { iTraining } from '@/interfaces/app';

@Component
export default class TrainigCard extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) item!: iTraining

    /**
     * @returns VNode
     */
    render(): VNode {
        return <router-link class="item__card" to={{ name: 'training_detail', params: { id: this.item.id } }}>
            <div class="item__description">
                <h3>{this.item.title}</h3>
            </div>
        </router-link>
    }
}
import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"
import Slick from "vue-slick"

import { iTraining } from "@/interfaces/app"
import TrainingCard from '@/components/training/Card'

const slickOpt = {
    rows: 0,
    arrows: false,
    slidesToShow: 1,
    infinite: false
}

@Component({
    computed: {
        ...mapGetters({
            trainingList: 'training/getTrainingList'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'training/fetch',
        })
    }
})
export default class TrainingCardList extends Vue {
    private isLoading: boolean = false

    private fetch!: () => Promise<boolean>
    private trainingList!: Array<iTraining>

    beforeMount() {
        this.init()
    }

    render(): VNode {
        return <section class="item__section">
            <header class="item__header">
                <h2>Trainings</h2>
                <div class="btn__holder">
                    <router-link to={{ name: 'training' }}>View all</router-link>
                </div>
            </header>
            {!this.isLoading
                ? <Slick ref="slick" options={slickOpt} class="item__slider">
                    {this.trainingList.map((training: iTraining) => <TrainingCard item={training} key={training.id} />)}
                </Slick>
                : null}
        </section>
    }

    async init() {
        this.isLoading = true

        await this.fetch()
        this.isLoading = false
    }
}
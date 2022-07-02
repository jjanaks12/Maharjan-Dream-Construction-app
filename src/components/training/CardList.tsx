import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"
import Slick from "vue-slick"

import { iTraining } from "@/interfaces/app"
import TrainingCard from '@/components/training/Card'
import CardLoading from "@/components/common/CardLoading"

const slickOpt = {
    rows: 0,
    arrows: false,
    slidesToShow: 1,
    infinite: false
}

@Component({
    computed: {
        ...mapGetters({
            list: 'training/getTrainingList'
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
    private list!: Array<iTraining>

    beforeMount() {
        this.init()
    }

    render(): VNode {
        return this.list.length > 0
            ? <section class="item__section">
                <header class="item__header">
                    <h2>Trainings</h2>
                    <div class="btn__holder">
                        <router-link to={{ name: 'training' }}>View all</router-link>
                    </div>
                </header>
                {!this.isLoading
                    ? <Slick ref="slick" options={slickOpt} class="item__slider">
                        {this.list.map((training: iTraining) => <TrainingCard item={training} key={training.id} />)}
                    </Slick>
                    : <CardLoading />}
            </section>
            : <div class="sr-only">Training</div>
    }

    async init() {
        this.isLoading = true

        await this.fetch()
        this.isLoading = false
    }
}
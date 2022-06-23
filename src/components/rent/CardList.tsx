import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'
import { mapActions, mapGetters } from "vuex"

import { iRent } from "@/interfaces/app"
import RentCard from '@/components/rent/Card'
import Slick from "vue-slick"

const slickOpt = {
    rows: 0,
    arrows: false,
    slidesToShow: 1,
    infinite: false
}

@Component({
    computed: {
        ...mapGetters({
            list: 'rent/getRentList'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'rent/fetch'
        })
    }
})
export default class RentCardList extends Vue {
    private isLoading: boolean = false

    private list!: Array<iRent>
    private fetch!: () => Promise<boolean>

    beforeMount() {
        this.init()
    }

    render(): VNode {
        return <section class="item__section">
            <header class="item__header">
                <h2>Rent</h2>
                <div class="btn__holder">
                    <router-link to={{ name: 'rent' }}>View all</router-link>
                </div>
            </header>
            {!this.isLoading
                ? <Slick ref="slick" options={slickOpt} class="item__slider">
                    {this.list.map((rent: iRent) => <RentCard item={rent} />)}
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
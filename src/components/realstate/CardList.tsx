import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"
import Slick from "vue-slick"

import { iRealState } from "@/interfaces/app"
import RealStateCard from './Card'

const slickOpt = {
    rows: 0,
    arrows: false,
    slidesToShow: 1,
    infinite: false
}

@Component({
    computed: {
        ...mapGetters({
            list: 'realstate/getPropertyList',
        })
    },
    methods: {
        ...mapActions({
            fetchProperty: 'realstate/fetch',
        })
    }
})
export default class PropertyCardList extends Vue {
    private isLoading: boolean = false

    private list!: Array<iRealState>
    private fetchProperty!: () => Promise<boolean>

    beforeMount() {
        this.init()
    }

    render(): VNode {
        return <section class="item__section">
            <header class="item__header">
                <h2>Realstate</h2>
                <div class="btn__holder">
                    <router-link to={{ name: 'realstate' }}>View all</router-link>
                </div>
            </header>
            {!this.isLoading
                ? <Slick ref="slick" options={slickOpt} class="item__slider">
                    {this.list.map((property: iRealState) => <RealStateCard item={property} />)}
                </Slick>
                : null}
        </section>
    }

    async init() {
        this.isLoading = true
        await this.fetchProperty()
        this.isLoading = false
    }
}
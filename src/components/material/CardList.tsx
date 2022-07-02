import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"
import Slick from "vue-slick"

import { iMaterial } from '@/interfaces/app'
import MaterialCard from '@/components/material/Card'
import CardLoading from '@/components/common/CardLoading'

const slickOpt = {
    rows: 0,
    arrows: false,
    slidesToShow: 1,
    infinite: false
}

@Component({
    computed: {
        ...mapGetters({
            list: 'material/getList'
        })
    },
    methods: {
        ...mapActions({
            fetchMaterial: 'material/fetch',
        })
    }
})
export default class MaterialCardList extends Vue {
    private isLoading = false

    private list!: Array<iMaterial>
    private fetchMaterial!: () => Promise<boolean>

    beforeMount() {
        this.init()
    }

    render(): VNode {
        return this.list.length > 0
        ? <section class="item__section">
            <header class="item__header">
                <h2>Materials</h2>
                <div class="btn__holder">
                    <router-link to={{ name: 'material' }}>View all</router-link>
                </div>
            </header>
            {!this.isLoading
                ? <Slick ref="slick" options={slickOpt} class="item__slider">
                    {this.list.map((material: iMaterial) => <MaterialCard item={material} />)}
                </Slick>
                : <CardLoading />}
        </section>
        : <div class="sr-only">Materials</div>
    }

    async init() {
        this.isLoading = true

        await this.fetchMaterial()
        this.isLoading = false
    }
}
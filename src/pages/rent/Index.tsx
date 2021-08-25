import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iRent } from "@/interfaces/app"
import RentItem from "@/components/rent/Item"

@Component({
    computed: {
        ...mapGetters({
            list: 'rent/getRentList',
            currentPage: 'rent/currentPage',
            lastPage: 'rent/lastPage'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'rent/fetch',
            prevPage: 'rent/prevPage',
            nextPage: 'rent/nextPage',
            gotoPage: 'rent/gotoPage'
        })
    }
})
export default class Rent extends Vue {
    private list!: Array<iRent>
    private isLoading: boolean = false

    private currentPage!: number
    private lastPage!: number
    private fetch!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>

    mounted() {
        this.isLoading = true

        this.fetch()
            .finally(() => {
                this.isLoading = false
            })
    }

    render(): VNode {
        return <main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Rent</h2>
                </header>
                {this.list.map((rent: iRent) => (<RentItem item={rent} />))}
                {this.currentPage < this.lastPage ? (<div class="text--center">
                    <a href="#" class="btn btn__primary" onClick={(event: MouseEvent) => { event.preventDefault(); this.nextPage() }}>load more</a>
                </div>) : null}
            </section>
        </main>
    }
}
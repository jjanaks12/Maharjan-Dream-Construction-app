import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iRent } from "@/interfaces/app"
import RentItem from "@/components/rent/Item"
import Paginate from "@/components/common/Paginate"

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
            prev: 'rent/prevPage',
            next: 'rent/nextPage',
            goto: 'rent/gotoPage'
        })
    }
})
export default class Rent extends Vue {
    private list!: Array<iRent>
    private isLoading: boolean = false

    private currentPage!: number
    private lastPage!: number
    private fetch!: () => Promise<boolean>
    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

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
                <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} />
            </section>
        </main>
    }
}
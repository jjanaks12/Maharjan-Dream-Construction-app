import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iRent } from "@/interfaces/app"
import TrainingItem from "@/components/training/Item"
import Paginate from "@/components/common/Paginate"
import CardLoading from "@/components/common/CardLoading"

@Component({
    computed: {
        ...mapGetters({
            list: 'training/getTrainingList',
            currentPage: 'training/currentPage',
            lastPage: 'training/lastPage',
            isLoggedIn: 'root/isLoggedIn'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'training/fetch',
            fetchEnrolled: 'training/fetchEnrolled',
            prev: 'training/prevPage',
            next: 'training/nextPage',
            goto: 'training/gotoPage'
        })
    }
})
export default class Rent extends Vue {
    private list!: Array<iRent>
    private isLoading: boolean = false

    private isLoggedIn!: boolean
    private currentPage!: number
    private lastPage!: number
    private fetch!: () => Promise<boolean>
    private fetchEnrolled!: () => Promise<boolean>
    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    mounted() {
        this.isLoading = true

        this.fetch()
            .then(() => {
                if (this.isLoggedIn)
                    this.fetchEnrolled()
            })
            .finally(() => {
                this.isLoading = false
            })
    }

    render(): VNode {
        return <main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Training</h2>
                    <div class="item__action">
                        {/* Back to detail Page */}
                        <router-link to={{ name: 'home' }} class="back"><span class="icon-d-arrow-left"></span></router-link>
                    </div>
                </header>
                {!this.isLoading
                    ? [
                        this.list.map((rent: iRent) => (<TrainingItem item={rent} />)),
                        <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} />
                    ]
                    : <CardLoading />
                }
            </section>
        </main>
    }
}
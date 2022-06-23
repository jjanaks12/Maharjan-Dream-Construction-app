import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iRent } from "@/interfaces/app"
import TrainingItem from "@/components/training/Item"
import Paginate from "@/components/common/Paginate"

@Component({
    computed: {
        ...mapGetters({
            list: 'training/getTrainingList',
            currentPage: 'training/currentPage',
            lastPage: 'training/lastPage'
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
                        <a href="#" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.$router.go(-1)
                        }} class="back"><span class="icon-d-arrow-left"></span></a>
                    </div>
                </header>
                {this.list.map((rent: iRent) => (<TrainingItem item={rent} />))}
                <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} />
            </section>
        </main>
    }
}
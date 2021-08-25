import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { iRent } from "@/interfaces/app"
import TrainingItem from "@/components/training/Item"

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
            prevPage: 'training/prevPage',
            nextPage: 'training/nextPage',
            gotoPage: 'training/gotoPage'
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
    private nextPage!: () => Promise<boolean>

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
                </header>
                {this.list.map((rent: iRent) => (<TrainingItem item={rent} />))}
                {this.currentPage < this.lastPage ? (<div class="text--center">
                    <a href="#" class="btn btn__primary" onClick={(event: MouseEvent) => { event.preventDefault(); this.nextPage() }}>load more</a>
                </div>) : null}
            </section>
        </main>
    }
}
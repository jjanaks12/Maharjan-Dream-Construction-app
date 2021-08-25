import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"

import { iMenu } from "@/interfaces/resturant"
import ResturantItem from "@/components/resturant/Item"

@Component({
    computed: {
        ...mapGetters({
            list: 'resturant/getMenuList',
            lastPage: 'resturant/lastMenuPage',
            currentPage: 'resturant/currentMenuPage',
        })
    },
    methods: {
        ...mapActions({
            fetch: 'resturant/menuFetch',
            nextPage: 'resturant/nextMenuPage',
            prevPage: 'resturant/prevMenuPage',
            goto: 'resturant/menuGotoPage',
        })
    }
})
export default class Resturant extends Vue {
    private isLoading: boolean = false
    private showForm: boolean = false

    private list!: Array<iMenu>
    private fetch!: () => Promise<boolean>

    private currentPage!: number
    private lastPage!: number
    private nextPage!: () => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    constructor(props: any) {
        super(props)
    }

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
                    <h2>Resturant</h2>
                </header>
                {this.list.map((resturant: iMenu) => (<ResturantItem item={resturant} />))}
                {this.currentPage < this.lastPage ? (<div class="text--center">
                    <a href="#" class="btn btn__primary" onClick={(event: MouseEvent) => { event.preventDefault(); this.nextPage() }}>load more</a>
                </div>) : null}
            </section>
        </main>
    }
}
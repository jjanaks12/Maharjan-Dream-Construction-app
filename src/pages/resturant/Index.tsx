import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"

import { iMenu } from "@/interfaces/resturant"
import ResturantItem from "@/components/resturant/Item"
import Paginate from "@/components/common/Paginate"

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
            next: 'resturant/nextMenuPage',
            prev: 'resturant/prevMenuPage',
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
    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>
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
                <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} />
            </section>
        </main>
    }
}
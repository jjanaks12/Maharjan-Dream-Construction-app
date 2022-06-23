import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iMaterial } from '@/interfaces/app'
import MaterialItem from '@/components/material/Item'
import Paginate from '@/components/common/Paginate'

@Component({
    computed: {
        ...mapGetters({
            list: 'material/getList',
            lastPage: 'material/lastPage',
            currentPage: 'material/currentPage'
        })
    },
    methods: {
        ...mapActions({
            fetchMaterial: 'material/fetch',
            next: 'material/nextPage',
            prev: 'material/prevPage',
            goto: 'material/gotoPage',
        })
    }
})
export default class RealState extends Vue {
    private list!: Array<iMaterial>
    private lastPage!: number
    private currentPage!: number

    private fetchMaterial!: () => Promise<boolean>
    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    beforeMount() {
        this.fetchMaterial()
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Materials</h2>
                    <div class="item__action">
                        {/* Back to detail Page */}
                        <a href="#" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.$router.go(-1)
                        }} class="back"><span class="icon-d-arrow-left"></span></a>
                    </div>
                </header>
                {this.list.map((material: iMaterial) => (<MaterialItem item={material} />))}
                <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} />
            </section>
        </main>)
    }
}

import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import RealestateItem from '@/components/realstate/Item'
import { iRealState } from '@/interfaces/app'
import Paginate from '@/components/common/Paginate'

@Component({
    computed: {
        ...mapGetters({
            propertyList: 'realstate/getPropertyList',
            lastPage: 'realstate/lastPage',
            currentPage: 'realstate/currentPage'
        })
    },
    methods: {
        ...mapActions({
            fetchProperty: 'realstate/fetch',
            next: 'realstate/nextPage',
            prev: 'realstate/prevPage',
            goto: 'realstate/gotoPage',
        })
    }
})
export default class RealState extends Vue {
    private propertyList!: Array<iRealState>
    private lastPage!: number
    private currentPage!: number

    private fetchProperty!: () => Promise<boolean>
    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    beforeMount() {
        this.fetchProperty()
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Realstates</h2>
                </header>
                {this.propertyList.map((property: iRealState) => (<RealestateItem item={property} />))}
                {this.currentPage < this.lastPage ? (<div class="text--center">
                    <a href="#" class="btn btn__primary">load more</a>
                </div>) : null}
                {/* <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} /> */}
            </section>
        </main>)
    }
}

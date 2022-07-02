import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'
import { mapActions, mapGetters } from "vuex"

import RentItem from "@/components/rent/Item"
import { iRent } from "@/interfaces/app"
import Paginate from "@/components/common/Paginate"
import CardLoading from "@/components/common/CardLoading"

@Component({
    computed: {
        ...mapGetters({
            isLoading: 'rent/isLoading',
            list: 'rent/getRentList',
            currentPage: 'rent/currentPage',
            lastPage: 'rent/lastPage',
            activeTab: 'realstate/activeTab'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'rent/fetch',
            prev: 'rent/prevPage',
            next: 'rent/nextPage',
            goto: 'rent/gotoPage',
            setActiveTab: 'rent/setActiveTab',
        })
    }
})
export default class RentList extends Vue {
    private isLoading!: boolean
    private list!: Array<iRent>

    private currentPage!: number
    private lastPage!: number

    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    render(): VNode {
        return !this.isLoading
            ? <div>
                {this.list.map((rent: iRent) => (<RentItem item={rent} />))}
                <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} />
            </div>
            : <CardLoading />
    }
}
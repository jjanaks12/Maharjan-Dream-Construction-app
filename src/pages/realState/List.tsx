import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
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
            next: 'realstate/nextPage',
            prev: 'realstate/prevPage',
            goto: 'realstate/gotoPage',
        })
    }
})
export default class RealStateList extends Vue {
    private propertyList!: Array<iRealState>
    private lastPage!: number
    private currentPage!: number

    private next!: () => Promise<boolean>
    private prev!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    @Prop({ default: 'Tab' }) title!: string
    @Prop({ default: false }) isMe!: boolean

    render(): VNode {
        return <div>
            {this.propertyList.map((property: iRealState) => (<RealestateItem item={property} />))}
            <Paginate current={this.currentPage} total={this.lastPage} onNext={() => this.next()} onPrev={() => this.prev()} onGoto={(pageno: number) => this.goto(pageno)} />
        </div>
    }
}

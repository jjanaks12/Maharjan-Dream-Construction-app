import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import RealestateItem from '@/components/realstate/Item'
import { iRealState } from '@/interfaces/app'

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
            fetchProperty: 'realstate/fetch'
        })
    }
})
export default class RealState extends Vue {
    private fetchProperty!: () => Promise<boolean>
    private propertyList!: Array<iRealState>
    private lastPage!: number
    private currentPage!: number

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
            </section>
        </main>)
    }
}

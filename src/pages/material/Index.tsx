import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iMaterial } from '@/interfaces/app'
import MaterialItem from '@/components/material/Item'

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
            nextPage: 'material/nextPage'
        })
    }
})
export default class RealState extends Vue {
    private list!: Array<iMaterial>
    private lastPage!: number
    private currentPage!: number

    private fetchMaterial!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>

    beforeMount() {
        this.fetchMaterial()
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Materials</h2>
                </header>
                {this.list.map((material: iMaterial) => (<MaterialItem item={material} />))}
                {this.currentPage < this.lastPage ? (<div class="text--center">
                    <a href="#" class="btn btn__primary" onClick={(event: MouseEvent) => { event.preventDefault(); this.nextPage() }}>load more</a>
                </div>) : null}
            </section>
        </main>)
    }
}

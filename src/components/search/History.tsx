import { iSearch } from '@/interfaces/search'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import { mapGetters, mapMutations } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            histories: 'root/historyList',
            currentPage: 'root/getCurrentPage'
        })
    },
    methods: {
        ...mapMutations({
            removeSearch: 'root/REMOVE_SEARCH'
        })
    }
})
export default class SearchHistory extends Vue {
    private histories!: Array<iSearch>
    private removeSearch!: (index: number) => void

    render(): VNode {
        return <div class="search__list">
            {this.histories.slice(0, 10).map((history: iSearch, index: number) => <div class="search__item">
                <a href="#" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.$router.push({
                        name: this.$route.name as string,
                        params: {
                            text: history.title
                        }
                    })
                }}>{history.title}</a>
                <a href="#" class="remove" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.removeSearch(index)
                }}><span class="icon-close"></span></a>
            </div>)}
        </div>
    }
}
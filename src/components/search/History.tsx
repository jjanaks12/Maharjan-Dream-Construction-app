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
    private removeSearch!: (id: number | undefined) => void
    private currentPage!: string

    get historyList(): Array<iSearch> {
        return this.histories.filter((history: iSearch) => history.type === this.currentPage)
    }

    render(): VNode {
        return <div class="search__list">
            {this.historyList.slice(0, 10).map((history: iSearch) => <div class="search__item">
                <a href="#" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.$router.push({
                        name: this.$route.name as string,
                        params: {
                            text: history.title
                        },
                        query: {
                            t: new Date().getTime().toString()
                        }
                    })
                }}>{history.title}</a>
                <a href="#" class="remove" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.removeSearch(history.id)
                }}><span class="icon-close"></span></a>
            </div>)}
        </div>
    }
}
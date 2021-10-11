import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { NavigationGuardNext, Route } from 'vue-router'

import { iSearch } from '@/interfaces/search'
import SearchRealstate from '@/components/search/Realstate'
import SearchRent from '@/components/search/Rent'
import SearchTraining from '@/components/search/Training'
import SearchMaterial from '@/components/search/Material'
import SearchHistory from '@/components/search/History'
import SearchResturant from '@/components/search/Resturant'

@Component({
  computed: {
    ...mapGetters({
      histories: 'root/historyList',
      currentPage: 'root/getCurrentPage'
    })
  },
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    this.$store.commit('root/UPDATE_SEARCH', false)
    next()
  },
})
export default class Search extends Vue {
  private histories!: Array<iSearch>
  private currentPage!: string

  render(): VNode {
    return (<main id="main">
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Search History</h2>
          <router-link to={{ name: this.currentPage }}>see all</router-link>
        </header>
        {this.histories.length > 0 ? <SearchHistory /> : null}
        {this.currentPage === 'realstate' ? <SearchRealstate /> : null}
        {this.currentPage === 'rent' ? <SearchRent /> : null}
        {this.currentPage === 'training' ? <SearchTraining /> : null}
        {this.currentPage === 'material' ? <SearchMaterial /> : null}
        {this.currentPage === 'resturant' ? <SearchResturant /> : null}
      </section>
    </main>)
  }
}

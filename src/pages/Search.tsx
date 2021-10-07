import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { iSearch } from '@/interfaces/search'
import SearchRealstate from '@/components/search/Realstate'
import SearchRent from '@/components/search/Rent'
import SearchTraining from '@/components/search/Training'
import SearchMaterial from '@/components/search/Material'
import SearchHistory from '@/components/search/History'

@Component({
  computed: {
    ...mapGetters({
      histories: 'root/historyList',
      currentPage: 'root/getCurrentPage'
    })
  }
})
export default class Search extends Vue {
  private histories!: Array<iSearch>
  private currentPage!: string

  render(): VNode {
    return (<main id="main">
      {/* <section class="featured__section">
        <div class="featured__image">
          <img src={img04} alt="image description" />
        </div>
        <div class="featured__caption">
          <h2 class="h1">All as you <mark>Wished</mark> for</h2>
          <p>See your dream with us</p>
        </div>
      </section> */}
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Search History</h2>
          <a href="#">see all</a>
        </header>
        {this.histories.length > 0 ? <SearchHistory /> : null}
        {this.currentPage === 'realstate' ? <SearchRealstate /> : null}
        {this.currentPage === 'rent' ? <SearchRent /> : null}
        {this.currentPage === 'training' ? <SearchTraining /> : null}
        {this.currentPage === 'material' ? <SearchMaterial /> : null}
      </section>
    </main>)
  }
}

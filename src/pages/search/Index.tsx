import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import img04 from '@/assets/images/img04.png'
import RealestateItem from '@/components/realstate/Item'

@Component
export default class Search extends Vue {
  render(): VNode {
    return (<main id="main">
      <section class="featured__section">
        <div class="featured__image">
          <img src={img04} alt="image description" />
        </div>
        <div class="featured__caption">
          <h2 class="h1">All as you <mark>Wished</mark> for</h2>
          <p>See your dream with us</p>
        </div>
      </section>
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Search History</h2>
          <a href="#">see all</a>
        </header>
        <RealestateItem />
        <RealestateItem />
      </section>
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Latest News</h2>
          <a href="#">see all</a>
        </header>
        <RealestateItem />
        <RealestateItem />
      </section>
    </main>)
  }
}

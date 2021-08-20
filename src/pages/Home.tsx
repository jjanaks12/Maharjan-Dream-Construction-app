import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import RealestateCollection from '@/components/realstate/Collection'

@Component
export default class Home extends Vue {
  render(): VNode {
    return (<main id="main">
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Latest News</h2>
          <a class="s" href="#">see all</a>
        </header>
      </section>
      <RealestateCollection />
    </main>)
  }
}

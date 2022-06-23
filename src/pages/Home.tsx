import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import RentCardList from '@/components/rent/CardList'
import TrainingCardList from '@/components/training/CardList'
import MaterialCardList from '@/components/material/CardList'
import PropertyCardList from '@/components/realstate/CardList'

@Component
export default class Home extends Vue {
  render(): VNode {
    return <main id="main">
      <PropertyCardList />
      <RentCardList />
      <MaterialCardList />
      <TrainingCardList />
    </main>
  }
}

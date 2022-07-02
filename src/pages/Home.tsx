import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import RentCardList from '@/components/rent/CardList'
import TrainingCardList from '@/components/training/CardList'
import MaterialCardList from '@/components/material/CardList'
import PropertyCardList from '@/components/realstate/CardList'
import Order from '@/pages/order/Index'

@Component({
	computed: {
		...mapGetters({
			isLoggedIn: 'root/isLoggedIn'
		})
	}
})
export default class Home extends Vue {
	private isLoggedIn!: boolean

	render(): VNode {
		return <main id="main">
			{this.isLoggedIn
				? <Order />
				: null}
			<PropertyCardList />
			<RentCardList />
			<MaterialCardList />
			<TrainingCardList />
		</main>
	}
}

import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { iRent } from '@/interfaces/app'
import RentItem from '../rent/Item'

@Component({
    computed: {
        ...mapGetters({
            list: 'rent/getRentList',
        })
    }
})
export default class SearchRent extends Vue {
    private list!: Array<iRent>

    render(): VNode {
        return <div>
            {this.list.map((rent: iRent) => (<RentItem item={rent} />))}
        </div>
    }
}
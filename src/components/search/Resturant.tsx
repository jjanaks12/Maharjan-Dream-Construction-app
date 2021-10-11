import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { iMenu } from '@/interfaces/app'
import ResturantItem from '../resturant/Item'

@Component({
    computed: {
        ...mapGetters({
            list: 'resturant/getMenuList',
        })
    }
})
export default class SearchResturant extends Vue {
    private list!: Array<iMenu>

    render(): VNode {
        return <div>
            {this.list.map((resturant: iMenu) => (<ResturantItem item={resturant} />))}
        </div>
    }
}
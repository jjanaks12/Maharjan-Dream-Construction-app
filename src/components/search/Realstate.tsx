import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { iRealState } from '@/interfaces/app'
import RealestateItem from '../realstate/Item'

@Component({
    computed: {
        ...mapGetters({
            list: 'realstate/getPropertyList'
        })
    }
})
export default class SearchRealstate extends Vue {
    private list!: Array<iRealState>

    render(): VNode {
        return <div>
            {this.list.map((realstate: iRealState) => <RealestateItem item={realstate} />)}
        </div>
    }
}
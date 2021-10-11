import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { iMaterial } from '@/interfaces/app'
import MaterialItem from '../material/Item'

@Component({
    computed: {
        ...mapGetters({
            list: 'material/getList',
        })
    }
})
export default class SearchMaterial extends Vue {
    private list!: Array<iMaterial>

    render(): VNode {
        return <div>
            {this.list.map((material: iMaterial) => (<MaterialItem item={material} />))}
        </div>
    }
}
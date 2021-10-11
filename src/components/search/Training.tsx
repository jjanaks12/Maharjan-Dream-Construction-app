import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import { iRent } from '@/interfaces/app'
import TrainingItem from "@/components/training/Item"

@Component({
    computed: {
        ...mapGetters({
            list: 'training/getTrainingList',
        })
    }
})
export default class SearchTraining extends Vue {
    private list!: Array<iRent>

    render(): VNode {
        return <div>
            {this.list.map((rent: iRent) => (<TrainingItem item={rent} />))}
        </div>
    }
}
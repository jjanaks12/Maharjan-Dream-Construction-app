import { Vue, Component } from 'vue-property-decorator'
import { VNode } from 'vue'

import axios from '@/services/axios'
import { iRealState } from '@/interfaces/app'
import RealestateItem from './Item'

@Component
export default class MyProperty extends Vue {
    private propertyList: Array<iRealState> = []

    mounted() {
        this.$nextTick(() => {
            this.fetch()
        })
    }

    render(): VNode {
        return <div>
            {this.propertyList.map((property: iRealState) => (<RealestateItem item={property} />))}
        </div>
    }

    async fetch() {
        const { data } = await axios('user/realStates')
        this.propertyList = data
    }
}
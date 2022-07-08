import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { VNode } from 'vue'

import axios from '@/services/axios'
import { iRealState } from '@/interfaces/app'
import RealestateItem from './Item'

@Component
export default class MyProperty extends Vue {
    private isLoading: boolean = false
    private propertyList: Array<iRealState> = []

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) shouldUpdate!: boolean

    @Watch('shouldUpdate')
    shouldUpdateChanged() {
        if (this.shouldUpdate)
            this.fetch()
    }

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
        this.isLoading = true
        const { data } = await axios('user/realStates')
        this.propertyList = data

        this.isLoading = false
        this.$emit('update')
    }
}
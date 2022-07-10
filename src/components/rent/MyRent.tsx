import { VNode } from "vue"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { iRent } from '../../interfaces/app';
import axios from '@/services/axios';
import RentItem from './Item';

@Component
export default class MyRent extends Vue {
    private isLoading: boolean = false
    private rentList: Array<iRent> = []

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
            {this.rentList.map((rent: iRent) => (<RentItem item={rent} />))}
        </div>
    }

    async fetch() {
        this.isLoading = true
        const { data } = await axios.get('user/rents')

        if (data)
            this.rentList = data

        this.isLoading = false
        this.$emit('update')
    }
}
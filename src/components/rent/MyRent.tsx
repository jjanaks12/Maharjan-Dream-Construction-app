import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { iRent } from '../../interfaces/app';
import axios from '@/services/axios';
import RentItem from './Item';

@Component
export default class MyRent extends Vue {
    private rentList: Array<iRent> = []

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
        const { data } = await axios.get('user/rents')

        if (data)
            this.rentList = data
    }
}
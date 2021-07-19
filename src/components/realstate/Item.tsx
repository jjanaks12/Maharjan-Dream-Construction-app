import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import img04 from '@/assets/images/img04.png'
import RealestateService from './Services'

@Component
export default class RealestateItem extends Vue {

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="item">
            <div class="item__image"><img src={img04} alt="image description" /></div>
            <div class="item__description">
                <h3><router-link to={{ name: 'search_detail' }}>sale at kavresthali</router-link></h3>
                <p>The most potential land is for Sale at Dhaneshwor, Kathmandu for an affordable price. The total area of this land is 4 aana.</p>
                <RealestateService />
            </div>
            <a href="#" class="item__link"><span class="icon-d-arrow"></span></a>
        </div>)
    }
}

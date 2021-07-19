import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import RealestateCollection from '@/components/realstate/Collection'
import img05 from '@/assets/images/img05.png'
import RealestateService from '@/components/realstate/Services'

@Component
export default class SearchDetail extends Vue {
    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <div class="item__detail">
                    <div class="item__detail__image">
                        <img src={img05} alt="image-description" />
                    </div>
                    <div class="item__detail__description">
                        <h2>Purano gaun</h2>
                        <p>The most potential land is for Sale at Purano Gaun, Chandragiri-4, Kathmandu for an affordable price. The total area of this land is 12 aana 2 dam . This property is available in a peaceful, pollution-free residential area. The price of the land is Rs. 25 lakh 50 thousand per aana.</p>
                        <RealestateService />
                    </div>
                </div>
            </section>
            <RealestateCollection />
        </main>)
    }
}

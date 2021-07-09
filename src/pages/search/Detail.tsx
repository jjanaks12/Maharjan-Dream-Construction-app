import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import img01 from '@/assets/images/img01.png'
import img02 from '@/assets/images/img02.png'
import img03 from '@/assets/images/img03.png'
import img05 from '@/assets/images/img05.png'

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
                        <div class="service__list">
                            <div class="service__item">
                                <span class="icon-bed"></span>
                                <span class="text">+3</span>
                            </div>
                            <div class="service__item">
                                <span class="icon-shower"></span>
                                <span class="text">+2</span>
                            </div>
                            <div class="service__item">
                                <span class="icon-car"></span>
                                <span class="text">+1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="collection__section">
                <h2>Kavresthali plots</h2>
                <div class="collection__grid">
                    <a href="#" class="collection__item">
                        <img src={img01} alt="image description" />
                    </a>
                    <a href="#" class="collection__item">
                        <img src={img02} alt="image description" />
                    </a>
                    <a href="#" class="collection__item">
                        <img src={img03} alt="img description" />
                        <span class="counter">+3</span>
                    </a>
                </div>
            </section>
        </main>)
    }
}

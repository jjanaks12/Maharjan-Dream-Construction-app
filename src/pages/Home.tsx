import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import img01 from '@/assets/images/img01.png'
import img02 from '@/assets/images/img02.png'
import img03 from '@/assets/images/img03.png'
import img04 from '@/assets/images/img04.png'

@Component
export default class Home extends Vue {
  render(): VNode {
    return (<main id="main">
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Latest News</h2>
          <a class="s" href="#">see all</a>
        </header>
        <div class="item">
          <div class="item__image"><img src={img04} alt="image description" /></div>
          <div class="item__description">
            <h3><a href="#">sale at kavresthali</a></h3>
            <p>The most potential land is for Sale at Dhaneshwor, Kathmandu for an affordable price. The total area of this land is 4 aana.</p>
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
          <a href="#" class="item__link"><span class="icon-d-arrow"></span></a>
        </div>
        <div class="item">
          <div class="item__image"><img src={img04} alt="image description" /></div>
          <div class="item__description">
            <h3><a href="#">sale at kavresthali</a></h3>
            <p>The most potential land is for Sale at Dhaneshwor, Kathmandu for an affordable price. The total area of this land is 4 aana.</p>
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
          <a href="#" class="item__link"><span class="icon-d-arrow"></span></a>
        </div>
        <div class="item">
          <div class="item__image"><img src={img04} alt="image description" /></div>
          <div class="item__description">
            <h3><a href="#">sale at kavresthali</a></h3>
            <p>The most potential land is for Sale at Dhaneshwor, Kathmandu for an affordable price. The total area of this land is 4 aana.</p>
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
          <a href="#" class="item__link"><span class="icon-d-arrow"></span></a>
        </div>
        <div class="item">
          <div class="item__image"><img src={img04} alt="image description" /></div>
          <div class="item__description">
            <h3><a href="#">sale at kavresthali</a></h3>
            <p>The most potential land is for Sale at Dhaneshwor, Kathmandu for an affordable price. The total area of this land is 4 aana.</p>
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
          <a href="#" class="item__link"><span class="icon-d-arrow"></span></a>
        </div>
      </section>
      <section class="collection__section">
        <h2>Bedroom</h2>
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

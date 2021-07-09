import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import img04 from '@/assets/images/img04.png'

@Component
export default class Search extends Vue {
  render(): VNode {
    return (<main id="main">
      <section class="featured__section">
        <div class="featured__image">
          <img src={img04} alt="image description" />
        </div>
        <div class="featured__caption">
          <h2 class="h1">All as you <mark>Wished</mark> for</h2>
          <p>See your dream with us</p>
        </div>
      </section>
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Search History</h2>
          <a href="#">see all</a>
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
      </section>
      <section class="item__section">
        <header class="item__section__heading">
          <h2>Latest News</h2>
          <a href="#">see all</a>
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
      </section>
    </main>)
  }
}

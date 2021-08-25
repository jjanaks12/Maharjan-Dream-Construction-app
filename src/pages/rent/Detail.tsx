import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import { iRent } from '@/interfaces/app'

@Component({
    methods: {
        ...mapActions({
            getRent: 'rent/getRent',
        })
    }
})
export default class RentDetail extends Vue {
    private getRent!: (id: number) => iRent

    private rent: iRent = {
        name: '',
        description: '',
        excerpt: '',
        machinery: '',
        price: ''
    }

    @Watch('$route', { deep: true })
    routeWatcher() {
        this.checkRoute()
    }

    mounted() {
        this.checkRoute()
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <div class="item__detail">
                    <div class="item__detail__description">
                        <h2 class="title">{this.rent.name}</h2>
                        <div class="holder">
                            <em class="price">Rs.{this.rent.price}</em>
                            <strong class="sub__heading">{this.rent.machinery}</strong>
                        </div>
                        <div class="text__holder" domPropsInnerHTML={this.rent.description} />
                    </div>
                </div>
                {/* <footer class="item__section__footer">
                    <a href="#" class="btn btn__info">request for rent</a>
                </footer> */}
            </section>
        </main>)
    }

    async checkRoute() {
        const id = parseInt(this.$route?.params?.id)
        this.rent = await this.getRent(id)
    }
}

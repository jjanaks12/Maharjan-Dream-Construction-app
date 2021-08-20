import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import Slick from 'vue-slick'

import RealestateCollection from '@/components/realstate/Collection'
import RealestateService from '@/components/realstate/Services'
import { iImage, iRealState } from '@/interfaces/app'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true
}

@Component({
    methods: {
        ...mapActions({
            getProperty: 'realstate/getProperty'
        })
    }
})
export default class RealstateDetail extends Vue {
    private getProperty!: (id: number) => iRealState
    private property: iRealState = {
        location: '',
        rate: '',
        unit: '',
        excerpt: '',
        description: '',
    }

    async mounted() {
        const id = parseInt(this.$route?.params?.id)
        this.property = await this.getProperty(id)

        setTimeout(() => {
            (this.$refs?.propertyDetailSlick as any)?.reSlick()
        }, 500)
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <div class="item__detail">
                    <Slick class="item__detail__image" options={slickOpt} ref="propertyDetailSlick">
                        {this.property.images?.map((image: iImage) => (<img src={image.image_url} alt={this.property.name} />))}
                    </Slick>
                    <div class="item__detail__description">
                        <h2>{this.property.location}</h2>
                        <div class="text__holder" domPropsInnerHTML={this.property.description} />
                        {this.property.detail ? (<RealestateService item={this.property.detail} />) : null}
                    </div>
                </div>
            </section>
            <RealestateCollection />
        </main>)
    }
}

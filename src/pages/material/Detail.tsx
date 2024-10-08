import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Slick from 'vue-slick'

import { iCart } from '@/interfaces/cart'
import { iImage, iMaterial } from '@/interfaces/app'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true
}

@Component({
    computed: {
        ...mapGetters({
            cartList: 'cart/getList',
            isLoggedIn: 'root/isLoggedIn'
        })
    },
    methods: {
        ...mapActions({
            getMaterial: 'material/getMaterial',
        }),
        ...mapMutations({
            addToCart: 'cart/ADD_TO_CART'
        })
    }
})
export default class MaterialDetail extends Vue {
    private isLoggedIn!: boolean

    private getMaterial!: (id: string) => iMaterial
    private addToCart!: (item: iMaterial) => Promise<boolean>
    private cartList!: Array<iCart>

    private material: iMaterial = {
        name: '',
        description: '',
        material_category_id: '',
        measurement_unit: '',
        price: 0,
        quantity: ''
    }

    @Watch('$route', { deep: true })
    routeWatcher() {
        this.checkRoute()
    }

    mounted() {
        this.checkRoute()
    }

    get isOnCart(): boolean {
        return Boolean(this.cartList.find((cart: iCart) => cart.material.id === this.material.id))
    }

    render(): VNode {
        return <main id="main">
            <section class="item__section">
                {!this.isOnCart
                    ? <header class="item__section__heading">
                        <div class="btn__holder">
                            {!this.isLoggedIn
                                ? null
                                : <a href="#" class="btn btn__xs btn__primary" onClick={(event: MouseEvent) => { event.preventDefault(); this.addToCart(this.material) }}>add to cart</a>
                            }
                            {/* Back to detail Page */}
                            <a href="#" onClick={(event: MouseEvent) => {
                                event.preventDefault()
                                this.$router.go(-1)
                            }} class="btn btn__icon"><span class="icon-d-arrow-left"></span></a>
                        </div>
                    </header>
                    : <header class="item__section__heading">
                        <div class="item__action">
                            {/* Back to detail Page */}
                            <a href="#" onClick={(event: MouseEvent) => {
                                event.preventDefault()
                                this.$router.go(-1)
                            }} class="back"><span class="icon-d-arrow-left"></span></a>
                        </div>
                    </header>}
                <div class="item__detail">
                    {this.material.images && this.material.images.length > 0
                        ? <Slick class="item__detail__image" options={slickOpt} ref="materialDetailSlick">
                            {this.material.images?.map((image: iImage) => (<img src={image.image_url} alt={this.material.name} />))}
                        </Slick>
                        : null}
                    <div class="item__detail__description">
                        <h2>{this.material.name}</h2>
                        <div class="text__holder" domPropsInnerHTML={this.material.description} />
                    </div>
                </div>
            </section>
        </main>
    }

    async checkRoute() {
        const id = this.$route?.params?.id
        this.material = await this.getMaterial(id)

        setTimeout(() => {
            (this.$refs?.materialDetailSlick as any)?.reSlick()
        }, 500)
    }
}

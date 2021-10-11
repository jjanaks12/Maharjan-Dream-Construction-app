import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import Slick from 'vue-slick'

import { iMenu } from '@/interfaces/resturant'
import { iImage } from '@/interfaces/app'
import ResturantSubItem from '@/components/resturant/SubItem'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true
}

const menuInit: iMenu = {
    name: '',
    price: '',
    description: '',
    excerpt: '',
    quantity: 0,
}

@Component({
    methods: {
        ...mapActions({
            getMenu: 'resturant/getMenu',
        })
    }
})
export default class ResturantDetail extends Vue {
    private getMenu!: (id: string) => iMenu
    private isLoading: boolean = true

    private menu: iMenu = menuInit

    @Watch('$route', { deep: true })
    routeWatcher() {
        this.menu = menuInit
        this.checkRoute()
    }

    mounted() {
        this.checkRoute()
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section training__section">
                <div class="item__detail">
                    <div class="item__detail__description">
                        {!this.isLoading
                            ? this.menu.images
                                ? <Slick class="item__detail__image" options={slickOpt} ref="menuDetailSlick">
                                    {this.menu.images?.map((image: iImage) => (<img src={image.image_url} alt={this.menu.name} />))}
                                </Slick>
                                : null
                            : null}
                        <h1 class="title">{this.menu.name}</h1>
                        <div class="holder">
                            <em class="price"><span>Rs. {this.menu.price}</span> for {this.menu.quantity}</em>
                        </div>
                        <div class="text__holder" domPropsInnerHTML={this.menu.description} />
                        {this.menu.children && this.menu.children.length > 0
                            ? [
                                <h2>Related Menu</h2>,
                                this.menu.children
                                    ? this.menu.children.map((submenu: iMenu) => <ResturantSubItem item={submenu} />)
                                    : null
                            ]
                            : null}

                    </div>
                </div>
            </section>
        </main>)
    }

    async checkRoute() {
        const id: string = this.$route?.params?.id as string

        this.menu = await this.getMenu(id)
        this.isLoading = false

        setTimeout(() => {
            (this.$refs?.menuDetailSlick as any)?.reSlick()
        }, 500)
    }
}

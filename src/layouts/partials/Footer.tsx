import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'

import { iMenu } from '@/interfaces/app'
import menuList from './menuList'
import { mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            currentPage: 'root/getCurrentPage'
        })
    }
})
export default class Footer extends Vue {
    private currentPage!: string
    private menus: Array<iMenu> = []

    mounted() {
        this.updateMenu()
    }

    @Watch('currentPage')
    currentPageWatcher() {
        this.updateMenu()
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<footer id="footer">
            <nav class="footer__nav__icon">
                <ul class="footer__nav">
                    {this.menus.map((item: iMenu) => (<li class={{ 'active': item.path === this.$route.name }}>
                        <router-link exact to={{ name: item.path }}>
                            <span class={item.icon}></span>
                            <span class="text">{item.text}</span>
                        </router-link>
                    </li>))}
                </ul>
            </nav>
        </footer>)
    }

    updateMenu() {
        this.menus = menuList.map((menu: iMenu) => {
            // if (menu.name === 'Home')
            //     menu.path = this.currentPage
            return menu
        })
    }
}

import { iMenu } from '@/interfaces/app'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import menuList from './menuList'


@Component({
    methods: {
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class Footer extends Vue {
    private logout!: () => Promise<boolean>

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<footer id="footer">
            <nav class="footer__nav__icon">
                <ul class="footer__nav">
                    {menuList.map((item: iMenu) => (<li class={{ 'active': item.path === this.$route.name }}>
                        <router-link to={{ name: item.path }}>
                            <span class={item.icon}></span>
                            <span class="text">{item.text}</span>
                        </router-link>
                    </li>))}
                </ul>
            </nav>
        </footer>)
    }
}

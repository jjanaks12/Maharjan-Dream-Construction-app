import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import SearchForm from '@/components/search/Form'
import Navigation from '@/layouts/partials/Navigation'

@Component({
    computed: {
        ...mapGetters({
            showNavigation: 'root/isMenuActive',
            showSearch: 'root/isSearchActive'
        })
    },
    methods: {
        ...mapMutations({
            toggleNavigation: 'root/UPDATE_MENU',
            toggleSearch: 'root/UPDATE_SEARCH'
        }),
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class Header extends Vue {
    private logout!: () => Promise<boolean>

    private showNavigation!: boolean
    private showSearch!: boolean
    private toggleNavigation!: (status: boolean) => void
    private toggleSearch!: (status: boolean) => void

    constructor(props: any) {
        super(props)
    }

    mounted() {
        this.$route.name === 'search' ? this.toggleSearch(true) : null
    }

    @Watch('$route')
    routeWatcher() {
        this.toggleNavigation(false)
    }

    get showShowSearch(): boolean {
        return !['collection'].includes(this.$route.name as string)
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<header id="header" class="is-app">
            <transition name="slide-fade" mode="out-in">
                {!this.showSearch ? (<div class="header-holder">
                    <button type="button" class="menu__opener" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.toggleNavigation(!this.showNavigation)
                    }}><span class="icon-menu"></span></button>
                    <router-link class="auth__user" to={{ name: 'account_info' }}>
                        <span class="icon-user"></span>
                        <span class="text">Me</span>
                    </router-link>
                    <a href="#" class={{ "search__opener": true, "hide": !this.showShowSearch }} onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.toggleSearch(true)
                        this.$router.push({ name: 'search' })
                    }}><span class="icon-search"></span></a>
                </div>) : (<SearchForm onClose={() => this.toggleSearch(false)} />)}
            </transition>
            <transition name="slide-fade" mode="out-in">
                {this.showNavigation ? (<Navigation onClose={() => this.toggleNavigation(false)} />) : null}
            </transition>
        </header>)
    }

    /**
     * User logout
     *
     * @param event
     *
     * @returns void
     */
    makeLogout(event: MouseEvent): void {
        event.preventDefault()

        this.logout()
            .then(() => {
                this.$router.push({ name: 'login' })
            })
    }
}

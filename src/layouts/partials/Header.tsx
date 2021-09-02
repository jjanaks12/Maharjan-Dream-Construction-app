import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import SearchForm from '@/components/search/Form'
import Navigation from '@/layouts/partials/Navigation'

@Component({
    computed: {
        ...mapGetters({
            showNavigation: 'root/isMenuActive'
        })
    },
    methods: {
        ...mapMutations({
            toggleNavigation: 'root/UPDATE_MENU'
        }),
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class Header extends Vue {
    private logout!: () => Promise<boolean>
    private showNavigation!: () => void
    private showSearchForm: boolean = false
    private toggleNavigation!: (status: boolean) => void

    constructor(props: any) {
        super(props)

        this.showSearchForm = this.$route.name === 'search'
    }

    @Watch('$route')
    routeWatcher() {
        this.toggleNavigation(false)
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<header id="header" class="is-app">
            <transition name="slide-fade" mode="out-in">
                {!this.showSearchForm ? (<div class="header-holder">
                    <button type="button" class="menu__opener" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.toggleNavigation(!this.showNavigation)
                    }}><span class="icon-menu"></span></button>
                    <router-link class="auth__user" to={{ name: 'account_info' }}>
                        <span class="icon-user"></span>
                        <span class="text">Me</span>
                    </router-link>
                    <a href="#" class="search__opener" onClick={this.toggleSearchForm}><span class="icon-search"></span></a>
                </div>) : (<SearchForm onClose={this.toggleSearchForm} />)}
            </transition>
            <transition name="slide-fade" mode="out-in">
                {this.showNavigation ? (<Navigation onClose={() => this.toggleNavigation(!this.showNavigation)} />) : null}
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

    toggleSearchForm(event: MouseEvent): void {
        event.preventDefault()

        this.showSearchForm = !this.showSearchForm

        if (this.showSearchForm)
            this.$router.push({ name: 'search' })
    }
}

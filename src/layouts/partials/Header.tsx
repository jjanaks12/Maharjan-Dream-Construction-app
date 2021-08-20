import SearchForm from '@/components/search/Form'
import Navigation from '@/layouts/partials/Navigation'

import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions } from 'vuex'


@Component({
    methods: {
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class Header extends Vue {
    private logout!: () => Promise<boolean>
    private showSearchForm: boolean = false
    private showNavigation: boolean = false
    private touchstartX: number = 0
    private touchstartY: number = 0
    private touchendX: number = 0
    private touchendY: number = 0

    constructor(props: any) {
        super(props)

        this.showSearchForm = this.$route.name === 'search'
    }

    mounted() {
        document.addEventListener('touchstart', (event: TouchEvent) => {
            this.touchstartX = event.changedTouches[0].screenX;
            this.touchstartY = event.changedTouches[0].screenY;
        }, false)

        document.addEventListener('touchend', (event: TouchEvent) => {
            this.touchendX = event.changedTouches[0].screenX;
            this.touchendY = event.changedTouches[0].screenY;
            this.handleGesture();
        }, false);
    }

    @Watch('$route')
    routeWatcher() {
        this.showNavigation = false
    }

    get distance(): number {
        return Math.sqrt(Math.pow(this.touchendX - this.touchstartX, 2) + Math.pow(this.touchendY - this.touchstartY, 2))
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<header id="header" class="is-app">
            <transition name="slide-fade" mode="out-in">
                {!this.showSearchForm ? (<div class="header-holder">
                    <button type="button" class="menu__opener" onClick={this.toggleNavigation}><span class="icon-menu"></span></button>
                    <router-link class="auth__user" to={{ name: 'account_info' }}>
                        <span class="icon-user"></span>
                        <span class="text">Me</span>
                    </router-link>
                    <a href="#" class="search__opener" onClick={this.toggleSearchForm}><span class="icon-search"></span></a>
                </div>) : (<SearchForm onClose={this.toggleSearchForm} />)}
            </transition>
            <transition name="slide-fade" mode="out-in">
                {this.showNavigation ? (<Navigation onClose={this.toggleNavigation} />) : null}
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

    toggleNavigation(event?: MouseEvent): void {
        if (event)
            event.preventDefault()

        this.showNavigation = !this.showNavigation
    }

    handleGesture() {
        if (this.distance < 100)
            return

        // Swiped Left
        if (this.touchendX < this.touchstartX) {
            this.showNavigation = false
        }

        // Swiped Right
        if (this.touchendX > this.touchstartX) {
            this.showNavigation = true
        }

        /*
        // Swiped Up
        if (this.touchendY < this.touchstartY) {
        }

        // Swiped Down
        if (this.touchendY > this.touchstartY) {
        }

        // Tap
        if (this.touchendY === this.touchstartY) {
        }
        */
    }
}

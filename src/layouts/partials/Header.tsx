import SearchForm from '@/components/search/Form'

import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
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

    constructor(props: any) {
        super(props)

        this.showSearchForm = this.$route.name === 'search'
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<header id="header" class="is-app">
            <transition name="slide-fade" mode="out-in">
                {!this.showSearchForm ? (<div class="header-holder">
                    <button type="button" class="menu__opener"><span class="icon-menu"></span></button>
                    <router-link class="auth__user" to={{ name: 'account' }}>
                        <span class="icon-user"></span>
                        <span class="text">Me</span>
                    </router-link>
                    <a href="#" class="search__opener" onClick={this.toggleSearchForm}><span class="icon-search"></span></a>
                </div>) : (<SearchForm onClose={this.toggleSearchForm} />)}
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

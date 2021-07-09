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

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<header id="header" class="is-app">
            <button type="button" class="menu__opener"><span class="icon-menu"></span></button>
            <a class="auth__user" href="#">
                <span class="icon-user"></span>
                <span class="text">Me</span>
            </a>
            <a href="#" type="button" class="search__opener"><span class="icon-search"></span></a>
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

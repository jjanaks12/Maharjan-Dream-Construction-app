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
export default class Account extends Vue {
    private logout!: () => Promise<boolean>
    
    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <a href="#" onClick={this.makeLogout}>logout</a>
        </main>)
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

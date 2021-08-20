import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Account extends Vue {

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Account</h2>
                </header>
                <div class="list">
                    <router-link to={{ name: 'account_info' }} class="list__item">Update Personal Information</router-link>
                    <router-link to={{ name: 'change_password' }} class="list__item">Change Password</router-link>
                </div>
            </section>
        </main>)
    }
}

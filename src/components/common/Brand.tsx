import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

import logo from '@/assets/images/logo.svg'


@Component
export default class Brand extends Vue {
    render(): VNode {
        return <div class="logo">
            <router-link to={{ name: 'home' }}>
                <img src={logo} alt="Guthi" />
            </router-link>
        </div>
    }
}
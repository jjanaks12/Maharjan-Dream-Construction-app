import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'

@Component
export default class Header extends Vue {
    render(): VNode {
        return <header id="header" class="home__header">
            <h1>Guthi</h1>
            <router-link class="btn btn__icon" to={{ name: 'login' }}><span class="icon-user"></span></router-link>
        </header>
    }
}
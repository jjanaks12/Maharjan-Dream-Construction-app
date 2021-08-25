import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoFound extends Vue {
  render(): VNode {
    return (<div class="not__found">
      <h1>Page not found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <div class="links">
        <router-link to={{ name: 'home' }}>Home</router-link>
        <router-link to={{ name: 'login' }}>Login</router-link>
      </div>
    </div>)
  }
}

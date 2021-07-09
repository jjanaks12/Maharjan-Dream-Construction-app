import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoFound extends Vue {
  render(): VNode {
    return (<div class="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-gray-400">
      <h1 class="text-5xl mb-3">Page not found</h1>
      <p class="mb-5">The page you are looking for doesn't exist.</p>
      <hr class="container h-1 bg-gray-600 border border-gray-800 mb-5" />
      <div class="space-x-3">
        <router-link to={{ name: 'home' }} class="text-yellow-500 hover:text-blue-200 transition transition-color">Home</router-link>
        <router-link to={{ name: 'login' }} class="text-yellow-500 hover:text-blue-200 transition transition-color">Login</router-link>
      </div>
    </div>)
  }
}

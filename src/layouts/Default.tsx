import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import AppFooter from '@/layouts/partials/Footer'
import AppHeader from '@/layouts/partials/Header'
import { iUserDetail } from '@/interfaces/auth'

@Component({
  computed: {
    ...mapGetters({
      userDetail: 'root/getLoggedinUser'
    })
  }
})
export default class Default extends Vue {
  private userDetail!: iUserDetail | null

  /**
   * Mounted hooks
   */
  // mounted() {
  // }

  /**
   * Template pf the component
   * 
   * @returns VNode
   */
  render(): VNode {
    return (<div id="wrapper">
      <AppHeader />
      <main id="main">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </main>
      <AppFooter />
    </div>)
  }
}

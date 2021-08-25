import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import AppFooter from '@/layouts/partials/Footer'
import AppHeader from '@/layouts/partials/Header'
import SnackBar from '@/components/common/SnackBar'

@Component({
  computed: {
    ...mapGetters({
      message: 'root/getErrorMessage',
      userDetail: 'root/getLoggedinUser'
    })
  }
})
export default class Default extends Vue {
  private message!: string

  constructor(props: any) {
    super(props)
  }

  /**
   * Template pf the component
   * 
   * @returns VNode
   */
  render(): VNode {
    return (<div id="wrapper" class="default__page">
      <AppHeader />
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
      <AppFooter />
      {this.message ? <SnackBar message={this.message} /> : null}
    </div>)
  }
}

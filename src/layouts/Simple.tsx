import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

import SnackBar from '@/components/common/SnackBar'

@Component({
  computed: {
    ...mapGetters({
      message: 'root/getErrorMessage',
    })
  }
})
export default class Simple extends Vue {
  private message!: string

  constructor(props:any) {
    super(props)
  }
  
  render(): VNode {
    return (<div id="wrapper" class="simple__page">
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
      {this.message ? <SnackBar message={this.message} /> : null}
    </div>)
  }
}

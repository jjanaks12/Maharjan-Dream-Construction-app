import '@/assets/scss/main.scss'

import { Component, Vue, Watch } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters, mapMutations } from 'vuex'
// import Hammer from 'hammerjs'

import { iUserDetail } from "@/interfaces/auth"
import Default from "@/layouts/Default"
import Simple from "@/layouts/Simple"
import HomePageLayout from '@/layouts/home/Index'

// let hammer
let timer: any = 0

@Component({
  computed: {
    ...mapGetters({
      userDetail: 'root/getLoggedinUser',
      showMenu: 'root/isMenuActive'
    })
  },
  methods: {
    ...mapMutations({
      toggleNavigation: 'root/UPDATE_MENU'
    }),
    ...mapActions({
      fetchUser: 'root/fetchUser'
    })
  }
})
export default class App extends Vue {
  // private showMenu!: boolean
  private fetchUser!: () => Promise<boolean>
  // private toggleNavigation!: (status: boolean) => void
  private userDetail!: iUserDetail

  mounted() {
    // const self = this

    // setTimeout(() => {
    //   const el: HTMLElement | null = document.querySelector('#wrapper')

    //   if (el) {
    //     hammer = new Hammer(el, {})
    //     hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL })

    //     hammer.on("swipe", function () {
    //       console.log('a');
          
    //       self.toggleNavigation(!self.showMenu)
    //     })
    //   }
    // }, 500)

    this.fetchUser()
  }

  @Watch('$route')
  routeChanged() {
    this.$store.commit('root/SET_ERROR_MESSAGE', '')

    if (this.userDetail && Object.keys(this.userDetail).length === 0)
      this.fetchUser()
  }

  @Watch('message')
  messageUpdated() {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      this.$store.commit('root/SET_ERROR_MESSAGE', '')
    }, 7000)
  }

  render(): VNode {
    return (<transition name="fade-transition" mode="out-in">
      {this?.$route?.meta?.layout === 'default' ? <Default key={1} /> : null}
      {this?.$route?.meta?.layout === 'simple' ? <Simple key={2} /> : null}
      {this?.$route?.meta?.layout === 'HomePageLayout' ? <HomePageLayout key={3} /> : null}
    </transition>)
  }
}
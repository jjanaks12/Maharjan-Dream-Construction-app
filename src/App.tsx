import '@/assets/scss/main.scss'

import { Component, Vue, Watch } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters, mapMutations } from 'vuex'

import Default from "@/layouts/Default"
import Simple from "@/layouts/Simple"
import HomePageLayout from '@/layouts/home/Index'

let timer: any = 0

@Component({
  computed: {
    ...mapGetters({
      isLoggedIn: 'root/isLoggedIn',
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
  private fetchUser!: () => Promise<boolean>
  private isLoggedIn!: boolean

  mounted() {
    this.fetchUser()
  }

  @Watch('$route')
  routeChanged() {
    this.$store.commit('root/SET_ERROR_MESSAGE', '')

    if (this.isLoggedIn)
      this.fetchUser()
  }

  @Watch('message')
  messageUpdated() {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      this.$store.commit('root/SET_ERROR_MESSAGE', '')
    }, 3000)
  }

  render(): VNode {
    return (<transition name="fade-transition" mode="out-in">
      {this?.$route?.meta?.layout === 'default' ? <Default key={1} /> : null}
      {this?.$route?.meta?.layout === 'simple' ? <Simple key={2} /> : null}
      {this?.$route?.meta?.layout === 'HomePageLayout' ? <HomePageLayout key={3} /> : null}
    </transition>)
  }
}
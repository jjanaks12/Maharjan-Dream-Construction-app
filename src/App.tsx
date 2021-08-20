import '@/assets/scss/main.scss'

import { Component, Vue, Watch } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from 'vuex'

import { iUserDetail } from './interfaces/auth'
import Default from "./layouts/Default"
import Simple from "./layouts/Simple"

let timer: any = 0

@Component({
  computed: {
    ...mapGetters({
      userDetail: 'root/getLoggedinUser'
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'root/fetchUser'
    })
  }
})
export default class App extends Vue {
  private fetchUser!: () => Promise<boolean>
  private userDetail!: iUserDetail

  mounted() {
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
    return (<transition name="fade-transition">
      {this?.$route?.meta?.layout === 'default' ? (<Default key={1} />) : (<Simple key={2} />)}
    </transition>)
  }
}
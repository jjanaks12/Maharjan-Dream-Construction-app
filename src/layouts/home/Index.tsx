import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapGetters } from "vuex"

import AppHeader from '@/layouts/home/partials/Header'
import AppFooter from '@/layouts/partials/Footer'
import SnackBar from '@/components/common/SnackBar'

@Component({
    computed: {
        ...mapGetters({
            message: 'root/getErrorMessage',
            userDetail: 'root/getLoggedinUser'
        })
    }
})
export default class HomeLayout extends Vue {
    private message!: string

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <div id="wrapper" class="home__page">
            <AppHeader />
            <transition name="slide-fade" mode="out-in">
                <router-view key={Date.now()} />
            </transition>
            <AppFooter />
            {this.message ? <SnackBar message={this.message} /> : null}
        </div>
    }
}
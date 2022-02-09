import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapMutations } from 'vuex'

import { iMenu } from '@/interfaces/app'
import Cart from '@/components/cart/Index'

const menuList: Array<iMenu> = [{
    icon: '',
    name: 'realstate',
    path: 'realstate',
    text: 'Realstate'
}, {
    icon: '',
    name: 'material',
    path: 'material',
    text: 'Materials'
}, {
    icon: '',
    name: 'rent',
    path: 'rent',
    text: 'Rents'
}, {
    icon: '',
    name: 'training',
    path: 'training',
    text: 'Trainings'
}, {
    icon: '',
    name: 'collection',
    path: 'collection',
    text: 'Collections'
}, {
//     icon: '',
//     name: 'resturant',
//     path: 'resturant',
//     text: 'Resturant'
// }, {
//     icon: '',
//     name: 'notification',
//     path: 'notification',
//     text: 'Notifications'
// }, {
    icon: '',
    name: 'order',
    path: 'order',
    text: 'My Orders'
}, {
    icon: '',
    name: 'account',
    path: 'account',
    text: 'My Account'
}]

@Component({
    methods: {
        ...mapMutations({
            updatePageName: 'root/SET_CURRENT_PAGE'
        }),
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class Navigation extends Vue {
    private updatePageName!: (current: string) => void
    private logout!: () => Promise<boolean>

    constructor(props: any) {
        super(props)
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<nav id="nav">
            <button type="button" class="btn__cancel" onClick={this.closeMenu}><span class="icon-close"></span></button>
            <ul class="main__menu">
                {menuList.map((menu: iMenu) => (<li>
                    <a href="#" onClick={(event: MouseEvent) => this.routeChanged(event, menu)}>{menu.text}</a>
                </li>))}
            </ul>
            <Cart />
            <div class="nav__footer">
                <a href="#" onClick={this.makeLogout}>logout</a>
            </div>
        </nav>)
    }

    closeMenu(event: MouseEvent): void {
        event.preventDefault()

        this.$emit('close', event)
    }

    routeChanged(event: MouseEvent, menu: iMenu): void {
        event.preventDefault()
        this.updatePageName(menu.name)

        this.$router.push({ name: menu.path })
    }

    /**
     * User logout
     *
     * @param event
     *
     * @returns void
     */
    makeLogout(event: MouseEvent): void {
        event.preventDefault()

        this.logout()
            .then(() => {
                this.$router.push({ name: 'login' })
            })
    }
}

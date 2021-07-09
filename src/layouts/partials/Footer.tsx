import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'


@Component({
    methods: {
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class Footer extends Vue {
    private logout!: () => Promise<boolean>

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<footer id="footer">
            <nav class="footer__nav__icon">
                <ul class="footer__nav">
                    <li class="active"><a href="#"><span class="icon-home"></span><span class="text">Home</span></a></li>
                    <li><a href="#"><span class="icon-collection"></span><span class="text">Collection</span></a></li>
                    <li><a href="#"><span class="icon-bell"></span><span class="text">Notification</span></a></li>
                    <li><router-link to={{ name: 'account' }}><span class="icon-user"></span><span class="text">Me</span></router-link></li>
                </ul>
            </nav>
        </footer>)
    }
}

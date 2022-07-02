import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import Modal from "@/components/common/Modal"
import RentCreate from "@/components/rent/Create"
import Tab from "@/components/common/tab/Index"
import TabItem from "@/components/common/tab/Item"
import RentList from "./List"
import MyRent from "@/components/rent/MyRent"

@Component({
    computed: {
        ...mapGetters({
            activeTab: 'rent/activeTab',
            isLoggedIn: 'root/isLoggedIn'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'rent/fetch',
            setActiveTab: 'rent/setActiveTab',
        })
    }
})
export default class Rent extends Vue {
    private showCreateModal: boolean = false
    private isLoading: boolean = false
    private activeTab!: string

    private isLoggedIn!: boolean
    private fetch!: () => Promise<boolean>
    private setActiveTab!: (title: string) => string

    mounted() {
        this.init()
    }

    render(): VNode {
        return <main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Rent</h2>
                    <div class="item__section__heading__action">
                        <a href="#" class={{ 'btn btn__icon': true, 'animate': this.isLoading }} onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.init()
                        }}><span class="icon-loop"></span></a>

                        {this.isLoggedIn
                            ? <a href="#" class="btn btn__icon" onClick={(event: MouseEvent) => {
                                event.preventDefault()
                                this.showCreateModal = true
                            }}><span class="icon-plus"></span></a>
                            : null}
                        {/* Back to detail Page */}
                        <router-link to={{ name: 'home' }} class="btn btn__icon"><span class="icon-d-arrow-left"></span></router-link>
                    </div>
                </header>
                <Tab onChange={(title: string) => this.setActiveTab(title)}>
                    <TabItem title="All" active={['All', ''].includes(this.activeTab)}>
                        <RentList />
                    </TabItem>
                    {this.isLoggedIn
                        ? <TabItem title="Mine" active={this.activeTab === 'Mine'}>
                            <MyRent />
                        </TabItem>
                        : null}
                </Tab>
                <Modal title="Add new Rental" v-model={this.showCreateModal}>
                    <RentCreate onClose={() => { this.showCreateModal = false }} />
                </Modal>
            </section>
        </main>
    }

    init() {
        this.isLoading = true

        this.fetch()
            .finally(() => {
                this.isLoading = false
            })
    }
}
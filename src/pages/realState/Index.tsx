import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import Modal from '@/components/common/Modal'
import RealstateCreate from '@/components/realstate/Create'
import Tab from '@/components/common/tab/Index'
import TabItem from '@/components/common/tab/Item'
import Collection from '@/components/realstate/Collection'
import RealStateList from './List'
import MyProperty from '@/components/realstate/MyProperty'

@Component({
    computed: {
        ...mapGetters({
            activeTab: 'realstate/activeTab',
            isLoggedIn: 'root/isLoggedIn'
        })
    },
    methods: {
        ...mapActions({
            fetchProperty: 'realstate/fetch',
            setActiveTab: 'realstate/setActiveTab',
        })
    }
})
export default class RealState extends Vue {
    private showCreateModal: boolean = false
    private isLoading: boolean = false

    private isLoggedIn!: boolean
    private fetchProperty!: () => Promise<boolean>
    private setActiveTab!: (title: string) => string
    private activeTab!: string

    mounted() {
        this.init()
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Realstates</h2>
                    <div class="item__section__heading__action">
                        <a href="#" class={{ 'btn btn__icon': true, 'animate': this.isLoading }} onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.init()
                        }}><span class="icon-loop"></span></a>
                        <a href="#" class="btn btn__icon" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.showCreateModal = true
                        }}><span class="icon-plus"></span></a>
                        {/* Back to detail Page */}
                        <a href="#" class="btn btn__icon" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.$router.go(-1)
                        }}><span class="icon-d-arrow-left"></span></a>
                    </div>
                </header>
                <Tab onChange={(title: string) => this.setActiveTab(title)}>
                    <TabItem title="All" active={['All', ''].includes(this.activeTab)}>
                        <RealStateList />
                    </TabItem>
                    {this.isLoggedIn
                        ? [<TabItem title="Mine" active={this.activeTab === 'Mine'}>
                            <MyProperty />
                        </TabItem>,
                        <TabItem title="Collection" active={this.activeTab === 'Collection'}>
                            <Collection />
                        </TabItem>]
                        : null}
                </Tab>
                <Modal title="Add new Property" v-model={this.showCreateModal}>
                    <RealstateCreate onClose={() => { this.showCreateModal = false }} />
                </Modal>
            </section>
        </main>)
    }

    init() {
        this.isLoading = true
        this.fetchProperty()
            .finally(() => {
                this.isLoading = false
            })
    }
}

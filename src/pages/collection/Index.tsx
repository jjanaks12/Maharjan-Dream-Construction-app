import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iCollection } from '@/interfaces/collection'

import RealestateCollection from '@/components/collection/Item'
import Modal from '@/components/common/Modal'
import CollectionForm from '@/components/collection/Form'

@Component({
    computed: {
        ...mapGetters({
            list: 'collection/list'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'collection/fetch'
        })
    }
})
export default class Collection extends Vue {
    private isLoading: boolean = false
    private showModal: boolean = false

    private list!: Array<iCollection>
    private fetch!: () => Promise<boolean>

    async mounted() {
        this.isLoading = true

        await this.fetch()
        this.isLoading = false
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Collection</h2>
                    <div class="text__holder">
                        <p>Organise your saved properties.</p>
                        <a href="#" class="btn btn__block btn__danger" onClick={(event: MouseEvent) => {
                            event.preventDefault()

                            this.showModal = true
                        }}>Create a Collection</a>
                    </div>
                </header>
                {this.list.map((collection: iCollection) => <RealestateCollection collection={collection} />)}
            </section>
            <Modal v-model={this.showModal}>
                <CollectionForm onClose={() => this.showModal = false} />
            </Modal>
        </main>)
    }
}

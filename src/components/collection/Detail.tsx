import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iCollection } from '@/interfaces/collection'
import { iRealState } from '@/interfaces/app'
import Modal from '../common/Modal'
import CollectionForm from './Form'

@Component({
    computed: {
        ...mapGetters({
            list: 'collection/list'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'collection/fetch',
            addToCollection: 'collection/addToCollection'
        })
    }
})
export default class CollectionDetail extends Vue {
    private showModal: boolean = false
    private list!: Array<iCollection>
    private fetch!: () => Promise<boolean>
    private addToCollection!: (payload: { id: string, realstate_id: string }) => Promise<boolean>

    constructor(props: any) {
        super(props)
    }

    async mounted() {
        if (this.list && this.list.length === 0) {
            await this.fetch()
        }
    }

    render(): VNode {
        const realstate_id: string = this.$route.params.id

        return <div class="collection__list">
            <h2>Available collections</h2>
            {this.list.map((collection: iCollection) => (
                collection.realstate
                    ? !collection.realstate.map((realstate: iRealState) => realstate.id).includes(realstate_id)
                    : true
            ) ? <a class="collection__list__item" href="#" onClick={async (event: MouseEvent) => {
                event.preventDefault()

                await this.addToCollection({
                    id: collection.id || '',
                    realstate_id: this.$route.params.id
                })
                this.$emit('close')
            }}>
                {collection.title}
            </a>
                : null)
            }
            <a class="collection__list__item" href="#" onClick={(event: MouseEvent) => {
                event.preventDefault()
                this.showModal = true
            }}>Add New Collection</a>
            <Modal v-model={this.showModal}>
                <CollectionForm onClose={() => { this.showModal = false }} />
            </Modal>
        </div>
    }
}
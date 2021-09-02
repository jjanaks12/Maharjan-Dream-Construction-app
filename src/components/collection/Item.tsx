import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import CoolLightBox from 'vue-cool-lightbox'

import { iCollection } from '@/interfaces/collection'
import { iImage, iRealState } from '@/interfaces/app'
import Dropdown from '../common/Dropdown'
import Modal from '../common/Modal'
import CollectionForm from './Form'
import { mapActions } from 'vuex'

@Component({
    methods: {
        ...mapActions({
            destory: 'collection/destory'
        })
    }
})
export default class CollectionItem extends Vue {
    private showModal: boolean = false
    private showDeleteModal: boolean = false
    private activeImage: number | null = null

    private destory!: (id: string) => Promise<boolean>

    get imageList(): Array<iImage> {
        return this.collection.realstate
            ? this.collection.realstate
                .reduce((acc, realstate: iRealState) => realstate.images
                    ? acc.concat(realstate.images)
                    : acc,
                    [] as Array<iImage>)
                .map((image: iImage) => ({ ...image, src: image.image_url }))
            : [] as Array<iImage>
    }
    get images() {
        return this.imageList.slice(0, 3);
    }

    get imageCount() {
        return this.imageList.length - 3
    }

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) collection!: iCollection

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<section class="collection__section">
            <header class="collection__section__header">
                <h2>{this.collection.title}</h2>
                <Dropdown>
                    <ul class="collection__option">
                        <li><a href="#" class="warning" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.showModal = true
                        }}>Edit</a></li>
                        <li><a href="#" class="danger" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.showDeleteModal = true
                        }}>Delete</a></li>
                    </ul>
                </Dropdown>
            </header>
            {this.images.length === 0
                ? <div class="collection__empty">
                    <p>You have not added any <router-link to={{ name: 'realstate' }}>realstate</router-link><br /> to this collection yet.</p>
                </div>
                : <div class={{ 'collection__grid': true, 'is-grid': this.imageList.length >= 3, 'is-flex': this.imageList.length == 2 }}>
                    {this.images.map((image: iImage, index: number) => <a href={image.image_url} class="collection__item" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.activeImage = index
                    }}>
                        <img src={image.image_url} alt="image description" />
                        {(this.imageCount > 0 && index == this.images.length - 1)
                            ? (<span class="counter">+{this.imageCount}</span>)
                            : null}
                    </a>
                    )}
                </div>}
            <CoolLightBox effect={'fade'} items={this.imageList} index={this.activeImage} closeOnClickOutsideMobile={true} gallery={false} onClose={() => this.activeImage = null} />
            <Modal v-model={this.showModal}>
                <CollectionForm detail={this.collection} onClose={() => this.showModal = false} />
            </Modal>
            <Modal v-model={this.showDeleteModal}>
                <div class="collection_confirm">
                    <h3>Are you sure you want to delete?</h3>
                    <p>Once you delete it can't be undone.</p>
                    <div class="btn__holder">
                        <a href="#" class="btn btn__xs btn__danger" onClick={async (event: MouseEvent) => {
                            event.preventDefault()
                            await this.destory(this.collection.id || '')
                            this.showDeleteModal = false
                        }}>okay</a>
                    </div>
                </div>
            </Modal>
        </section>)
    }
}

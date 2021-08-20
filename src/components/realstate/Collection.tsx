import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import CoolLightBox from 'vue-cool-lightbox'

interface iImage {
    id?: number
    src: string
}

@Component
export default class RealestateCollection extends Vue {
    private imageList: Array<iImage> = [{
        src: 'https://cdn.corporatefinanceinstitute.com/assets/real-estate-1024x614.jpeg'
    }, {
        src: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f0c98c0147a4f0006753d4b%2F960x0.jpg%3Ffit%3Dscale'
    }, {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTYvTKatmBJsFrOku5ZpnuHDp7VxlGZWcJA&usqp=CAU'
    }, {
        src: 'https://www.realestateinnepal.com/wp-content/uploads/2020/09/house-for-sale-in-bhaisepati-magar-gaun-13-500x350.jpg'
    }, {
        src: 'https://nepalrealestates.com/wp-content/uploads/2020/08/house-on-sale-in-hattiban.jpg'
    }]

    private activeImage: number | null = null

    get images() {
        return this.imageList.slice(0, 3);
    }

    get imageCount() {
        return this.imageList.length - 3
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<section class="collection__section">
            <h2>Bedroom</h2>
            <div class={{ 'collection__grid': true, 'is-grid': this.imageList.length >= 3, 'is-flex': this.imageList.length == 2 }}>
                {this.images.map((image: iImage, index: number) => (<a href={image.src} class="collection__item" onClick={(event: MouseEvent) => this.setActiveImage(event, index)}>
                    <img src={image.src} alt="image description" />
                    {(this.imageCount > 0 && index == this.images.length - 1) ? (<span class="counter">+{this.imageCount}</span>) : null}
                </a>))}
            </div>
            <CoolLightBox effect={'fade'} items={this.imageList} index={this.activeImage} closeOnClickOutsideMobile={true} gallery={false} onClose={() => this.activeImage = null} />
        </section>)
    }

    setActiveImage(event: MouseEvent, index: number) {
        event.preventDefault()
        this.activeImage = index
    }
}

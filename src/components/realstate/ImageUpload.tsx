import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"

import { iImage, iRealState } from "@/interfaces/app"
import { mapActions } from "vuex"

@Component({
    methods: {
        ...mapActions({
            saveProperty: 'realstate/save',
            deleteImage: 'realstate/deleteImage'
        })
    }
})
export default class PropertyImageUpload extends Vue {
    private images: Array<ArrayBuffer> = []
    private isSaving: boolean = false
    private imageList: Array<iImage> = []

    private saveProperty!: (formData: any) => Promise<boolean>
    private deleteImage!: (id: string) => Promise<boolean>

    @Prop() property!: iRealState

    constructor(props: any) {
        super(props)
    }

    mounted() {
        if (this.property.images && this.property.images.length > 0)
            this.imageList = [...this.property.images]
    }

    render(): VNode {
        return <div class="image__list">
            <label class="custom__input">
                <input type="file" multiple onChange={this.onChange} accept="image/*" />
                <div class="custom__input__text">
                    {this.images.length > 0
                        ? <span>{this.images.length} image{this.images.length > 1 ? 's' : ''} selected</span>
                        : null}
                    <strong>Upload an image</strong>
                    <span>PNG, JPG, GIF is supported</span>
                </div>
            </label>

            {/* newly added images */}
            {this.images.map((image: ArrayBuffer, index: number) => <div class="image">
                <img src={image} alt="image description" />
                <a href="#" class="remove" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.removeImage(index)
                }}><span class="icon-trash"></span></a>
            </div>)}

            {/* existing images */}
            {this.property.images
                ? this.imageList.map((image: iImage, index: number) => <div class="image">
                    <img src={image.image_url} alt={this.property.location} />
                    <a href="#" class="remove" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.disposeImage(image.id as string, index)
                    }}><span class="icon-trash"></span></a>
                </div>)
                : null}

            {/* If user adds any new images */}
            {this.images.length > 0
                ? <a href="#" class="btn__upload" onClick={this.save}>
                    {this.isSaving
                        ? <span class="icon-loop"></span>
                        : <span class="icon-upload"></span>
                    }
                </a>
                : null}
        </div>
    }

    onChange(event: Event) {
        const element = event.target as HTMLInputElement
        const fileList: FileList | null = element.files
        const readers: Array<FileReader> = []

        if (fileList) {
            for (let index: number = 0; index < fileList.length; index++) {
                const fileReader: FileReader = new FileReader()
                const uploadedFile: File | null = fileList.item(index)

                if (uploadedFile) {
                    fileReader.readAsDataURL(uploadedFile)
                    readers.push(fileReader)
                }
            }
        }

        Promise.all(readers)
            .then(() => {
                readers.forEach((fileReader: FileReader) => {
                    fileReader.onload = () => {
                        if (fileReader.result) {
                            this.images.push(fileReader.result as ArrayBuffer)
                        }
                    }
                })
            })
    }

    removeImage(index: number) {
        this.images.splice(index, 1)
    }

    save(event: MouseEvent) {
        event.preventDefault()
        delete this.property.videos
        delete this.property.users

        this.isSaving = true
        this.saveProperty({
            ...this.property,
            images: this.images
        })
            .then(() => {
                this.$emit('update')
            })
            .finally(() => {
                this.images = []
                this.isSaving = false
            })
    }

    disposeImage(id: string, index: number) {
        this.deleteImage(id)
            .then(() => {
                this.imageList.splice(index, 1)
            })
    }
}
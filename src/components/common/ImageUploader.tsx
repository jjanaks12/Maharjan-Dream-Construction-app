import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from 'vue'
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera"
import { Capacitor } from "@capacitor/core"
import { Filesystem } from "@capacitor/filesystem"

enum ButtonType {
    DEFAULT = "default",
    PRIMARY = "primary",
    SECONDARY = "secondary",
    DANGER = "danger",
    SUCCESS = "success"
}

enum ButtonSize {
    XS = "xs",
    DEFAULT = "",
    LG = "lg"
}

@Component
export default class ImageUploader extends Vue {
    constructor(props: any) {
        super(props)
    }

    @Prop({ default: ButtonType.DEFAULT }) type!: ButtonType
    @Prop({ default: ButtonSize.DEFAULT }) size!: ButtonSize

    /* return Vue Node */
    render(): VNode {
        return <button type="button" class={{
            "btn": this.type !== ButtonType.DEFAULT,
            ["btn-" + this.type]: this.type !== ButtonType.DEFAULT,
            ["btn-" + this.size]: this.size !== ButtonSize.DEFAULT
        }} onClick={this.selectPhoto}>{this.$slots.default}</button>
    }

    async selectPhoto() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        })

        this.saveImage(image)
    }

    async saveImage(photo: Photo) {
        const base64Data = await this.readAsBase64(photo) as string

        this.$emit('update', base64Data)
    }

    async readAsBase64(photo: Photo) {
        if (['ios', 'android'].includes(Capacitor.getPlatform())) {

            if (photo.path) {
                const file = await Filesystem.readFile({
                    path: photo.path,
                })

                return 'data:image/jpeg;base64,' + file.data
            }
        } else {
            if (photo.webPath) {
                const response = await fetch(photo.webPath)
                const blob = await response.blob()

                return await this.convertBlobToBase64(blob) as string
            }
        }
    }

    convertBlobToBase64(blob: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onerror = reject
            reader.onload = () => {
                resolve(reader.result)
            }

            reader.readAsDataURL(blob)
        })
    }
}
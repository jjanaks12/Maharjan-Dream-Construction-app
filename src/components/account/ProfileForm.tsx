import { VNode } from "vue"
import { Component, Watch } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import FormComponent from "@/core/FormComponent"
import { iUserDetail } from "@/interfaces/auth"

interface profile {
    id?: string,
    address: string,
    email: string,
    name: string,
    phone: string,
    photo?: Array<string>,
    citizenship_back?: Array<string>,
    citizenship_front?: Array<string>,
    [propName: string]: any
}

@Component({
    computed: {
        ...mapGetters({
            userDetail: 'root/getLoggedinUser'
        })
    },
    methods: {
        ...mapActions({
            save: 'root/save'
        })
    }
})
export default class ProfileForm extends FormComponent {
    private userDetail!: iUserDetail
    private isSaving: boolean = false
    private save!: (formData: profile) => Promise<boolean>
    private formData: profile = {
        address: '',
        email: '',
        name: '',
        phone: '',
    }

    constructor(props: any) {
        super(props)

        this.errors = {
            address: [],
            email: [],
            name: [],
            phone: [],
            citizenship_back: [],
            citizenship_front: [],
            photo: []
        }
    }

    mounted() {
        this.formData = {
            id: this.userDetail.id,
            address: this.userDetail.address,
            email: this.userDetail.email,
            name: this.userDetail.name,
            phone: this.userDetail.phone,
        }
    }

    @Watch('userDetail')
    userDetailChanged() {
        this.formData = {
            id: this.userDetail.id,
            address: this.userDetail.address,
            email: this.userDetail.email,
            name: this.userDetail.name,
            phone: this.userDetail.phone,
        }
    }

    render(): VNode {
        return (<div class="account__form">
            <div class="avatar">
                {this.formData.photo && this.formData.photo.length > 0 ? <img src={this.formData.photo[0]} alt={this.formData.name} /> : <span class="icon-user" />}
                <label class="custom__file__upload">
                    <input type="file" accept="*/image" onChange={(event: Event) => { this.fileHandler(event, 'photo') }} />
                    <span class="btn btn__danger btn__xs">Select a Photo</span>
                </label>
            </div>
            <form action="#" method="POST" novalidate onSubmit={this.formSubmit}>
                <div class="form__group">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Fullname" v-model={this.formData.name} />
                </div>
                <div class="form__group">
                    <label for="address">Address</label>
                    <input type="text" name="address" id="address" placeholder="Address" v-model={this.formData.address} />
                </div>
                <div class="form__group">
                    <label for="phone">Phone</label>
                    <input type="text" name="phone" id="phone" placeholder="Phone" v-model={this.formData.phone} />
                </div>
                <div class="form__group">
                    <strong>Other Documents</strong>
                    <div class="files">
                        <label class="custom__file__upload">
                            <input type="file" accept="*/image" onChange={(event: Event) => { this.fileHandler(event, 'citizenship_front') }} />
                            {this.formData.citizenship_front && this.formData.citizenship_front.length > 0 ? <img src={this.formData.citizenship_front[0]} alt={this.formData.name} /> : <span class="text">Upload citizenship front</span>}
                        </label>
                        <label class="custom__file__upload">
                            <input type="file" accept="*/image" onChange={(event: Event) => { this.fileHandler(event, 'citizenship_back') }} />
                            {this.formData.citizenship_back && this.formData.citizenship_back.length > 0 ? <img src={this.formData.citizenship_back[0]} alt={this.formData.name} /> : <span class="text">Upload citizenship back</span>}
                        </label>
                    </div>
                </div>
                <div class="btn__holder">
                    <button type="submit" class="btn btn__primary">
                        {this.isSaving ? (<span class="icon-spinner loading"></span>) : null}
                        Save</button>
                </div>
            </form>
        </div>)
    }

    /**
     * for file uploading and conveting images to base64 format
     * @param event 
     * @returns void
     */
    fileHandler(event: Event, field: string): void {
        const element = event.target as HTMLInputElement
        const fileList: FileList | null = element.files

        if (fileList) {
            const fileReader: FileReader = new FileReader()
            const file = fileList[0]

            if (file) {
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    if (fileReader.result) {
                        if (!this.formData[field])
                            this.formData[field] = []

                        this.formData[field][0] = (fileReader.result as string)
                        this.$forceUpdate()
                    }
                }
            }
        }

    }

    formSubmit(event: HTMLFormElement): void {
        event.preventDefault()
        this.resetErrorMessage()

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isSaving = true

                this.save(this.formData)
                    .then(() => {
                        this.$emit('close')
                        this.resetErrorMessage()
                    })
                    .finally(() => {
                        this.isSaving = false
                    })
            }
        })
    }
}
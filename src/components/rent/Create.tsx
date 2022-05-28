import FormComponent from "@/core/FormComponent"
import { iRent } from "@/interfaces/app"
import { validate } from "vee-validate"
import { VNode } from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { mapActions } from "vuex"

@Component({
    methods: {
        ...mapActions({
            save: 'rent/save'
        })
    }
})
export default class RentCreate extends FormComponent {
    private isSaving: boolean = false
    private formData: iRent = {
        name: '',
        description: 'Write your descrption here',
        excerpt: '',
        machinery: '',
        price: ''
    }

    private save!: (formData: iRent) => Promise<boolean>

    constructor(props: any) {
        super(props)

        this.errors = {
            name: [],
            description: [],
            excerpt: [],
            machinery: [],
            price: []
        }
    }

    @Prop() detail!: iRent

    @Watch('detail', { deep: true })
    onDetailChanged() {
        this.init()
    }

    mounted() {
        this.init()
    }

    render(): VNode {
        return <form action="#" onSubmit={this.formSubmit}>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.name.length > 0 }}>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Name of the Rental" v-model={this.formData.name} />
            </div>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.excerpt.length > 0 }}>
                <label for="excerpt">Excerpt</label>
                <textarea name="excerpt" id="excerpt" placeholder="Short text for Rental" v-model={this.formData.excerpt} />
            </div>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.machinery.length > 0 }}>
                <label for="machinery">Machinery</label>
                <input type="text" name="machinery" id="machinery" placeholder="Name of the rental" v-model={this.formData.machinery} />
            </div>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.price.length > 0 }}>
                <label for="price">Price</label>
                <input type="text" name="price" id="price" placeholder="Price for Rental" v-model={this.formData.price} />
            </div>
            <div class="btn__holder">
                <button type="submit" class="btn btn__success">{this.isSaving ? <span class="icon-spinner animate"></span> : null} Save</button>
            </div>
        </form>
    }

    async formSubmit(event: HTMLFormElement) {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.name, 'required', { name: 'name' })
            .then(result => {
                this.errors['name'] = result.errors
            })

        await validate(this.formData.excerpt, 'required', { name: 'excerpt' })
            .then(result => {
                this.errors['excerpt'] = result.errors
            })

        await validate(this.formData.machinery, 'required', { name: 'machinery' })
            .then(result => {
                this.errors['machinery'] = result.errors
            })

        await validate(this.formData.price, 'required', { name: 'price' })
            .then(result => {
                this.errors['price'] = result.errors
            })


        this.$nextTick(async () => {
            if (!this.hasError) {
                this.isSaving = true

                try {
                    this.save(this.formData)
                        .then(() => {
                            this.$emit('close')
                        })
                        .finally(() => {
                            this.isSaving = false
                        })
                } finally {
                    this.isSaving = false
                }
            }
        })
    }

    init() {
        if (this.detail)
            this.formData = {
                id: this.detail.id,
                name: this.detail.name,
                description: this.detail.description,
                excerpt: this.detail.excerpt,
                machinery: this.detail.machinery,
                price: this.detail.price
            }
    }
}
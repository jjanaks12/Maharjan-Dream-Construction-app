import { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { validate } from 'vee-validate'
import { mapActions } from 'vuex'

import FormComponent from '@/core/FormComponent'
import { iCollection } from '@/interfaces/collection'
import { iErrorMessage } from '@/interfaces/auth'

@Component({
    methods: {
        ...mapActions({
            save: 'collection/save'
        })
    }
})
export default class CollectionForm extends FormComponent {
    private isSaving: boolean = false
    private errorList?: iErrorMessage
    private save!: (formData: iCollection) => Promise<boolean>
    private formData: iCollection = {
        title: ''
    }

    constructor(props: any) {
        super(props)

        this.errors = {
            title: []
        }
    }

    @Prop({ default: null }) detail!: iCollection | null

    mounted() {
        if (this.detail && Object.keys(this.detail).length > 0) {
            this.formData.id = this.detail.id
            this.formData.title = this.detail.title
        }
    }

    render(): VNode {
        return <div class="collection__form">
            <h2>Add new Collection</h2>
            <form action="#" onSubmit={this.formSubmitted} novalidate>
                <div class={{ 'form__group': true, 'input--invalid': this.errors.title.length > 0 }}>
                    <label class="sr-only" for="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="Title of the collection" v-model={this.formData.title} />
                    {this.errors.title.length > 0 ? (<span class="input__text">{this.errors.title[0]}</span>) : null}
                </div>
                <div class="btn__holder">
                    <div class="btn__block">
                        <button type="submit" class="btn btn__primary">
                            {this.isSaving ? (<span class="icon-spinner loading"></span>) : null}
                            save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }

    /**
     * 
     * @param event 
     * HTML Form submit event
     * 
     * @returns void
     */
    async formSubmitted(event: HTMLFormElement): Promise<void> {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.title, 'required', { name: 'title' })
            .then(result => {
                this.errors['title'] = result.errors
            })

        this.$nextTick(async () => {
            if (!this.hasError) {
                this.isSaving = true

                try {
                    const data = await this.save(this.formData)

                    if (data) {
                        this.errors = { ...this.errors, ...this.errorList }
                        this.$emit('close')
                    }

                } finally {
                    this.isSaving = false
                }
            }
        })
    }
}
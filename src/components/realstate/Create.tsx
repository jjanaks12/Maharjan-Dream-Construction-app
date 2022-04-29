import { validate } from 'vee-validate'
import { VNode } from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator'

import FormComponent from '@/core/FormComponent'
import { iRealState } from '@/interfaces/app'
import { mapActions } from 'vuex';

@Component({
    methods: {
        ...mapActions({
            save: 'realstate/save'
        })
    }
})
export default class RealstateCreate extends FormComponent {
    private isSaving: boolean = false
    private formData: iRealState = {
        location: '',
        excerpt: '',
        rate: '',
        unit: '',
        description: 'Write your description here',
        detail: {}
    }

    private save!: (formData: iRealState) => Promise<boolean>

    constructor(props: any) {
        super(props)

        this.errors = {
            location: [],
            excerpt: [],
            rate: [],
            unit: [],
            description: [],
        }
    }

    @Prop() detail!: iRealState

    @Watch('detail', { deep: true })
    onDetailChanged() {
        this.init()
    }

    mounted() {
        this.init()
    }

    init() {
        if (this.detail)
            this.formData = {
                id: this.detail.id,
                location: this.detail.location,
                excerpt: this.detail.excerpt,
                rate: this.detail.rate,
                unit: this.detail.unit,
                description: this.detail.description,
            }
    }

    render(): VNode {
        return <form onSubmit={this.formSubmit} novalidate method="POST">
            <div class={{ 'form__group': true, 'input--invalid': this.errors.location.length > 0 }}>
                <label for="location">Location</label>
                <input type="text" name="location" id="location" placeholder="location of the property" v-model={this.formData.location} />
            </div>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.excerpt.length > 0 }}>
                <label for="excerpt">Excerpt</label>
                <textarea name="excerpt" id="excerpt" placeholder="Short detail of the property" v-model={this.formData.excerpt} />
            </div>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.rate.length > 0 }}>
                <label for="rate">Rate</label>
                <input type="text" name="rate" id="rate" placeholder="Rate of the property" v-model={this.formData.rate} />
            </div>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.unit.length > 0 }}>
                <label for="unit">Unit</label>
                <input type="text" name="unit" id="unit" placeholder="Area of the property" v-model={this.formData.unit} />
            </div>
            <div class="btn__holder">
                <button type="submit" class="btn btn__success">{this.isSaving ? <span class="icon-spinner animate"></span> : null} Save</button>
            </div>
        </form>
    }

    async formSubmit(event: HTMLFormElement) {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.location, 'required', { name: 'location' })
            .then(result => {
                this.errors['location'] = result.errors
            })

        await validate(this.formData.excerpt, 'required', { name: 'excerpt' })
            .then(result => {
                this.errors['excerpt'] = result.errors
            })

        await validate(this.formData.unit, 'required', { name: 'unit' })
            .then(result => {
                this.errors['unit'] = result.errors
            })

        await validate(this.formData.rate, 'required', { name: 'rate' })
            .then(result => {
                this.errors['rate'] = result.errors
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
}
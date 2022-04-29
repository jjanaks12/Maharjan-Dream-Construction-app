import { VNode } from "vue"
import { Component } from "vue-property-decorator"
import { validate } from "vee-validate"
import { mapActions, mapGetters } from "vuex"

import { formData } from "@/interfaces/cart"
import { iErrorMessage, iUserDetail } from "@/interfaces/auth"
import { iDelivery } from "@/interfaces/delivery"

import FormComponent from "@/core/FormComponent"

@Component({
    computed: {
        ...mapGetters({
            deliveryList: 'root/deliveryType',
            user: 'root/getLoggedinUser'
        })
    },
    methods: {
        ...mapActions({
            makeOrder: 'cart/makeOrder',
            fetchDeliveryType: 'root/fetchDeliveryType'
        })
    }
})
export default class OrderForm extends FormComponent {
    private isSaving: boolean = false

    private errorList?: iErrorMessage
    private makeOrder!: (formData: formData) => Promise<boolean>
    private deliveryList!: Array<iDelivery>
    private user!: iUserDetail
    private fetchDeliveryType!: () => Promise<Array<iDelivery>>

    private formData: formData = {
        type: 'material',
        delivery_id: '',
        delivery_address: ''
    }

    constructor(props: any) {
        super(props)

        this.errors = {
            delivery_address: [],
            delivery_id: [],
        }
    }

    async mounted() {
        this.fetchDeliveryType()
            .then(() => {
                this.formData.delivery_address = this.user.address
            })
    }

    render(): VNode {
        return <form class="order__form" novalidate method="POST" onSubmit={this.formSubmit}>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.delivery_address.length > 0 }}>
                <label for="address">Delivery Address</label>
                <input type="text" name="address" id="address" v-model={this.formData.delivery_address} />
            </div>
            <div class={{ 'form__group': true, 'input--invalid': this.errors.delivery_id.length > 0 }}>
                <label for="delivery_type">Delivery Type</label>
                <select name="delivery_type" id="delivery_type" v-model={this.formData.delivery_id}>
                    <option value="">Select a Location</option>
                    {this.deliveryList.map((delivery: iDelivery) => <option value={delivery.slug}>{delivery.name}</option>)}
                </select>
            </div>
            <div class="btn__holder">
                <button type="submit" class="btn btn__success">place Order</button>
            </div>
        </form>
    }

    async formSubmit(event: HTMLFormElement) {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.delivery_address, 'required', { name: 'delivery_address' })
            .then(result => {
                this.errors['delivery_address'] = result.errors
            })

        await validate(this.formData.delivery_id, 'required', { name: 'delivery_id' })
            .then(result => {
                this.errors['delivery_id'] = result.errors
            })

        this.$nextTick(async () => {
            if (!this.hasError) {
                this.isSaving = true

                try {
                    const data = await this.makeOrder(this.formData)

                    if (!data)
                        this.errors = { ...this.errors, ...this.errorList }
                    else
                        this.$emit('close')

                } finally {
                    this.isSaving = false
                }
            }
        })
    }
}
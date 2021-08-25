import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"

import { DeliveryType, formData } from "@/interfaces/cart"

@Component
export default class OrderForm extends Vue {
    private formData: formData = {
        type: 'material',
        product_id: 0,
        quantity: 0,
        delivery_date: '',
        delivery_id: DeliveryType.local,
        delivery_address: ''
    }

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <form class="order__form" no-validate method="POST" onSubmit={this.formSubmit}>
            <div class="form__group">
                <label for="address">Delivery Address</label>
                <input type="text" name="address" id="address" v-model={this.formData.delivery_address} />
            </div>
            <div class="form__group">
                <label for="delivery_type">Delivery Type</label>
                <select name="delivery_type" id="delivery_type" v-model={this.formData.delivery_id}>
                    <option value={0}>Select a Location</option>
                    <option value={DeliveryType.local}>Local</option>
                    <option value={DeliveryType.interstate}>Inter-state</option>
                    <option value={DeliveryType.international}>International</option>
                </select>
            </div>
            <div class="btn__holder">
                <button type="submit" class="btn btn__success">place Order</button>
            </div>
        </form>
    }

    formSubmit(event: HTMLFormElement) {
        event.preventDefault()

        console.log(this.formData);
        
    }
}
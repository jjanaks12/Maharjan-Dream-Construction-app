import { iErrorMessage, iUserDetail } from '@/interfaces/auth'
import FormComponent from '@/core/FormComponent'

import { validate } from 'vee-validate'
import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            errorList: 'root/getErrorMessage'
        })
    },
    methods: {
        ...mapActions({
            register: 'root/register'
        })
    }
})
export default class Register extends FormComponent {
    private register!: (formData: iUserDetail) => Promise<boolean>
    private isLoggingIn: boolean = false
    private errorList?: iErrorMessage
    private isSuccess: boolean = false
    private formData: iUserDetail = {
        name: 'Janak Shrestha',
        address: 'futung',
        password: 'password',
        confirm_password: 'password',
        phone: '9876543210',
        email: 'jjanaks12@gmail.com',
    }

    constructor() {
        super()

        this.errors = {
            name: [],
            address: [],
            password: [],
            confirm_password: [],
            phone: [],
            email: []
        }
    }

    /**
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<section class="account__section">
            <div class="account__section__body">
                {!this.isSuccess ? [<h1>Register</h1>,
                <form action="#" class="account__section__form" onSubmit={this.formSubmitted} novalidate>
                    <div class={{ 'form__group': true, 'input--invalid': this.errors.name.length > 0 }}>
                        <label class="sr-only" for="asf-name">Full Name</label>
                        <input type="text" name="name" id="asf-name" placeholder="Name" v-model={this.formData.name} />
                        {this.errors.name.length > 0 ? (<span class="input__text">{this.errors.name[0]}</span>) : null}
                    </div>
                    <div class={{ 'form__group': true, 'input--invalid': this.errors.email.length > 0 }}>
                        <label class="sr-only" for="asf-username">Username</label>
                        <input type="email" name="username" id="asf-username" placeholder="Email" v-model={this.formData.email} />
                        {this.errors.email.length > 0 ? (<span class="input__text">{this.errors.email[0]}</span>) : null}
                    </div>
                    <div class={{ 'form__group': true, 'input--invalid': this.errors.password.length > 0 }}>
                        <label class="sr-only" for="asf-password">Password</label>
                        <input type="password" name="password" id="asf-password" placeholder="Password" v-model={this.formData.password} />
                        {this.errors.password.length > 0 ? (<span class="input__text">{this.errors.password[0]}</span>) : null}
                    </div>
                    <div class={{ 'form__group': true, 'input--invalid': this.errors.confirm_password.length > 0 }}>
                        <label class="sr-only" for="asf-confirm_password">Confirm Password</label>
                        <input type="password" name="password" id="asf-confirm_password" placeholder="Confirm Password" v-model={this.formData.confirm_password} />
                        {this.errors.confirm_password.length > 0 ? (<span class="input__text">{this.errors.confirm_password[0]}</span>) : null}
                    </div>
                    <div class={{ 'form__group': true, 'input--invalid': this.errors.address.length > 0 }}>
                        <label class="sr-only" for="asf-address">Address</label>
                        <input type="text" name="name" id="asf-address" placeholder="Address" v-model={this.formData.address} />
                        {this.errors.address.length > 0 ? (<span class="input__text">{this.errors.address[0]}</span>) : null}
                    </div>
                    <div class={{ 'form__group': true, 'input--invalid': this.errors.phone.length > 0 }}>
                        <label class="sr-only" for="asf-phone">Phone</label>
                        <input type="text" name="name" id="asf-phone" placeholder="Phone" v-model={this.formData.phone} />
                        {this.errors.phone.length > 0 ? (<span class="input__text">{this.errors.phone[0]}</span>) : null}
                    </div>
                    <div class="btn__holder">
                        <div class="btn__block">
                            <button type="submit" class="btn btn__danger">
                                {this.isLoggingIn ? (<span class="icon-spinner loading"></span>) : null}
                                Register
                            </button>
                        </div>
                        <div class="btn__block">
                            <span class="text">or</span>
                        </div>
                        <div class="btn__block">
                            <router-link to={{ name: "login" }} class="btn btn__primary">login</router-link>
                        </div>
                    </div>
                </form>] : <div class="account__message">
                    <h2 class="h3">Your account has been created successfully</h2>
                    <p>Please check you registered email <strong>{this.formData.email}</strong> for verification link.</p>
                    <a href="#" class="btn btn__primary" onClick={(event: MouseEvent) => {
                        event.preventDefault();
                        this.$router.push({
                            name: 'login', query: {
                                email: this.formData.email
                            }
                        })
                    }}>Continue</a>
                </div>}
            </div>
        </section >)
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

        await validate(this.formData.email, 'required|email|min:4', { name: 'email' })
            .then(result => {
                this.errors['email'] = result.errors
            })

        await validate(this.formData.name, 'required', { name: 'name' })
            .then(result => {
                this.errors['name'] = result.errors
            })

        await validate(this.formData.address, 'required', { name: 'address' })
            .then(result => {
                this.errors['address'] = result.errors
            })

        await validate(this.formData.password, 'required|min:6|confirmed:confirmation', { name: 'password', values: { confirmation: this.formData.confirm_password } })
            .then(result => {
                this.errors['password'] = result.errors
            })

        await validate(this.formData.confirm_password, 'required', { name: 'confirm_password' })
            .then(result => {
                this.errors['confirm_password'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isLoggingIn = true
                const formData = { ...this.formData }
                delete formData.confirm_password

                this.register(formData)
                    .then(() => {
                        this.errors = { ...this.errors, ...this.errorList }

                        if (!this.hasError)
                            this.isSuccess = true
                    })
                    .finally(() => {
                        this.isLoggingIn = false
                    })
            }
        })
    }
}

import { iUserDetail } from '@/interfaces/auth'
import FormComponent from '@/core/FormComponent'

import { validate } from 'vee-validate'
import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
    methods: {
        ...mapActions({
            register: 'root/register'
        })
    }
})
export default class Login extends FormComponent {
    private register!: (formData: iUserDetail) => Promise<boolean>
    private isLoggingIn: boolean = false
    private formData: iUserDetail = {
        name: 'Janak Shrestha',
        email: 'jjanaks12@gmail.com',
    }

    constructor() {
        super()

        this.errors = {
            email: [],
            name: []
        }
    }

    /**
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<section class="account__section">
            <div class="account__section__body">
                <h1>Register</h1>
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
                </form>
            </div>
        </section>)
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

        this.$nextTick(() => {
            if (!this.hasError) {
                this.isLoggingIn = true

                this.register(this.formData)
                    .then(() => {
                        this.$router.push({ name: 'home' })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoggingIn = false
                    })
            }
        })
    }
}

import { VNode } from "vue"
import { Component } from "vue-property-decorator"
import { validate } from "vee-validate"
import { mapActions, mapGetters } from "vuex"

import FormComponent from "@/core/FormComponent"
import { iErrorMessage } from "@/interfaces/auth"

@Component({
    computed: {
        ...mapGetters({
            errorList: 'root/getErrorMessage',
        })
    },
    methods: {
        ...mapActions({
            forgotPassword: 'root/forgotPassword'
        })
    }
})
export default class ForgotPassword extends FormComponent {
    private isLoading: boolean = false
    private errorList?: iErrorMessage
    private isSuccess: boolean = false
    private formData: { email: string } = {
        email: '',
    }

    private forgotPassword!: (email: string) => Promise<boolean>

    constructor(props: any) {
        super(props)

        this.errors = {
            email: [],
        }
    }

    render(): VNode {
        return <main id="main">
            <section class="forgot__password__section">
                <div class="forgot__password__holder">
                    {!this.isSuccess
                        ? [
                            <h1>Forgot Your password?</h1>,
                            <form action="#" method="POST" no-validate onSubmit={this.formSubmitted}>
                                <div class={{ 'form__group': true, 'input--invalid': this.errors.email.length > 0 }}>
                                    <label for="email" class="sr-only">Email</label>
                                    <input type="email" id="email" name="email" placeholder="Email" v-model={this.formData.email} />
                                    {this.errors.email.length > 0 ? <span class="input__text">{this.errors.email[0]}</span> : null}
                                </div>
                                <div class="btn__holder">
                                    <button type="submit" class="btn btn__primary">
                                        {this.isLoading ? (<span class="icon-spinner loading"></span>) : null}
                                        Reset password?
                                    </button>
                                    <a href="#" class="back" onClick={this.backPage}>back</a>
                                </div>
                            </form>
                        ]
                        : <div class="text--center">
                            <h1>A mail has been sent to your {this.formData.email}</h1>
                            <p>Please follow the link on email to reset your password.</p>
                            <div class="btn__holder">
                                <router-link to={{ name: 'login' }} class="btn btn__success">Okay</router-link>
                            </div>
                        </div>}
                </div>
            </section>
        </main>
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

        this.$nextTick(async () => {
            if (!this.hasError) {
                this.isLoading = true

                try {
                    const data = await this.forgotPassword(this.formData.email)

                    if (!data) {
                        this.errors = { ...this.errors, ...this.errorList }
                    } else {
                        // this.isSuccess = true
                    }
                } finally {
                    this.isLoading = false
                }
            }
        })
    }

    backPage(event: MouseEvent): void {
        event.preventDefault()

        this.$router.go(-1)
    }
}
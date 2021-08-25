import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { validate } from 'vee-validate'
import { mapActions } from 'vuex'

import FormComponent from '@/core/FormComponent'
import { resetPassword } from '@/interfaces/auth'

@Component({
    methods: {
        ...mapActions({
            resetPassword: 'root/resetPassword'
        })
    }
})
export default class ResetPassword extends FormComponent {
    private isSaving: boolean = false
    private resetPassword!: (formData: resetPassword) => Promise<boolean>
    private formData: resetPassword = {
        password: '',
        password_confirmation: '',
        email: '',
        code: '',
    }

    constructor(props: any) {
        super(props)

        this.errors = {
            password: [],
            password_confirmation: [],
        }
    }

    mounted() {
        this.formData.code = this.$route.query.code as string
        this.formData.email = this.$route.query.email as string
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <section class="password__section">
                <div class="password__section__holder">
                    <h2>Change Password</h2>
                    <form action="#" class="change__password__form" onSubmit={this.formSubmitted} novalidate>
                        <div class="form__group">
                            <label class="sr-only" for="new_password">New Password</label>
                            <input type="password" name="new_password" id="new_password" placeholder="New Password" v-model={this.formData.password} />
                            {this.errors.password.length > 0 ? (<span class="input__text">{this.errors.password[0]}</span>) : null}
                        </div>
                        <div class="form__group">
                            <label class="sr-only" for="confirm_password">Confirm New Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm New Password" v-model={this.formData.password_confirmation} />
                            {this.errors.password_confirmation.length > 0 ? (<span class="input__text">{this.errors.password_confirmation[0]}</span>) : null}
                        </div>
                        <div class="btn__holder">
                            <div class="btn__block">
                                <button type="submit" class="btn btn__primary">
                                    {this.isSaving ? (<span class="icon-spinner loading"></span>) : null}
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>)
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

        await validate(this.formData.password, 'required|min:6|confirmed:confirmation', { name: 'password', values: { confirmation: this.formData.password_confirmation } })
            .then(result => {
                this.errors['password'] = result.errors
            })

        await validate(this.formData.password_confirmation, 'required|min:6', { name: 'password' })
            .then(result => {
                this.errors['password_confirmation'] = result.errors
            })

        this.$nextTick(() => {

            if (!this.hasError) {
                this.isSaving = true

                this.resetPassword(this.formData)
                    .then(() => {
                        this.$router.push({ name: 'account' })
                    })
                    .finally(() => {
                        this.isSaving = false
                    })
            }
        })
    }
}

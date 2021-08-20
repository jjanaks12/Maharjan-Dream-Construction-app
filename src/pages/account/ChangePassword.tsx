import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { validate } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'

import FormComponent from '@/core/FormComponent'
import { iPassword, iUserDetail } from '@/interfaces/auth'

@Component({
    computed: {
        ...mapGetters({
            userDetail: 'root/getLoggedinUser'
        })
    },
    methods: {
        ...mapActions({
            changePassword: 'root/changePassword'
        })
    }
})
export default class ChangePassword extends FormComponent {
    private isSaving: boolean = false
    private userDetail!: iUserDetail
    private changePassword!: (formData: iPassword) => Promise<boolean>
    private formData: iPassword = {
        old_password: '',
        password: '',
        password_confirmation: '',
    }

    constructor(props: any) {
        super(props)

        this.errors = {
            old_password: [],
            password: [],
            password_confirmation: [],
        }
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Change Password</h2>
                </header>
                <form action="#" class="change__password__form" onSubmit={this.formSubmitted} novalidate>
                    <div class="form__group">
                        <label for="old_password">Old Password</label>
                        <input type="password" name="old_password" id="old_password" v-model={this.formData.old_password} />
                        {this.errors.old_password.length > 0 ? (<span class="input__text">{this.errors.old_password[0]}</span>) : null}
                    </div>
                    <div class="form__group">
                        <label for="new_password">New Password</label>
                        <input type="password" name="new_password" id="new_password" v-model={this.formData.password} />
                        {this.errors.password.length > 0 ? (<span class="input__text">{this.errors.password[0]}</span>) : null}
                    </div>
                    <div class="form__group">
                        <label for="confirm_password">New Password</label>
                        <input type="password" name="confirm_password" id="confirm_password" v-model={this.formData.password_confirmation} />
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

        await validate(this.formData.old_password, 'required|min:6', { name: 'email' })
            .then(result => {
                this.errors['old_password'] = result.errors
            })

        await validate(this.formData.password, 'required|min:6|confirmed:confirmation', { name: 'password', values: { confirmation: this.formData.password_confirmation } })
            .then(result => {
                this.errors['password'] = result.errors
            })

        await validate(this.formData.password_confirmation, 'required|min:6', { name: 'password' })
            .then(result => {
                this.errors['password_confirmation'] = result.errors
            })

        this.$nextTick(() => {

            if (!this.hasError && this.userDetail.uuid) {
                this.isSaving = true

                this.changePassword({
                    id: this.userDetail.uuid,
                    ...this.formData
                })
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

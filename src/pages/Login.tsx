import { iErrorMessage, iLogin } from '@/interfaces/auth'
import FormComponent from '@/core/FormComponent'

import { validate } from 'vee-validate'
import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import Brand from '@/components/common/Brand'

@Component({
  computed: {
    ...mapGetters({
      errorList: 'root/getErrorMessage',
    })
  },
  methods: {
    ...mapActions({
      login: 'root/login'
    })
  }
})
export default class Login extends FormComponent {
  private login!: (formData: iLogin) => Promise<boolean>
  private isLoggingIn: boolean = false
  private errorList?: iErrorMessage
  private formData: iLogin = {
    email: '',
    password: ''
  }

  constructor() {
    super()

    this.errors = {
      email: [],
      password: []
    }
  }

  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.email)
        this.formData.email = this.$route.query.email as string
    })
  }

  /**
   * 
   * @returns VNode
   */
  render(): VNode {
    return (<section class="account__section">
      <div class="account__section__body">
        <Brand />
        <h1>Login</h1>
        <form action="#" class="account__section__form" onSubmit={this.formSubmitted} novalidate>
          <div class={{ 'form__group': true, 'input--invalid': this.errors.email.length > 0 }}>
            <label class="sr-only" for="asf-username">Username</label>
            <input type="email" name="username" id="asf-username" placeholder="Username" v-model={this.formData.email} />
            {this.errors.email.length > 0 ? (<span class="input__text">{this.errors.email[0]}</span>) : null}
          </div>
          <div class={{ 'form__group': true, 'input--invalid': this.errors.password.length > 0 }}>
            <label class="sr-only" for="asf-password">Password</label>
            <input type="password" name="password" id="asf-password" placeholder="Password" v-model={this.formData.password} />
            {this.errors.password.length > 0 ? (<span class="input__text">{this.errors.password[0]}</span>) : null}
          </div>
          <div class="form__holder">
            <router-link to={{ name: "forgot_password" }} class="forgot__password">Forgot password?</router-link>
          </div>
          <div class="btn__holder">
            <div class="btn__block">
              <button type="submit" class="btn btn__primary">
                {this.isLoggingIn ? (<span class="icon-spinner loading"></span>) : null}
                login
              </button>
            </div>
            <div class="btn__block">
              <span class="text">or</span>
            </div>
            <div class="btn__block">
              <router-link to={{ name: 'register' }} class="btn btn__danger">register</router-link>
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

    await validate(this.formData.password, 'required', { name: 'password' })
      .then(result => {
        this.errors['password'] = result.errors
      })

    this.$nextTick(async () => {
      if (!this.hasError) {
        this.isLoggingIn = true

        try {
          const data = await this.login(this.formData)

          if (data) {
            this.errors = { ...this.errors, ...this.errorList }
            this.$store.dispatch('root/fetchUser')
            this.$router.push({ name: 'home' })
          }

        } finally {
          this.isLoggingIn = false
        }
      }
    })
  }
}

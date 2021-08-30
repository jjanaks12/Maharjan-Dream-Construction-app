import { VNode } from 'vue'
import { Component, Prop, Watch } from "vue-property-decorator"
import { mapActions, mapGetters } from 'vuex'

import FormComponent from '@/core/FormComponent'
import { iErrorMessage, iUserDetail } from '@/interfaces/auth'
import { validate } from 'vee-validate'
import { appointment, AppointmentType } from '@/interfaces/appointment'
import moment from 'moment'

@Component({
    computed: {
        ...mapGetters({
            errorList: 'root/getErrorMessage',
            user: 'root/getLoggedinUser'
        })
    },
    methods: {
        ...mapActions({
            requestAppointment: 'appointment/requestAppointment'
        })
    }
})
export default class Appointment extends FormComponent {
    private user!: iUserDetail
    private saving: boolean = false
    private errorList?: iErrorMessage
    private requestAppointment!: (formData: appointment) => Promise<boolean>
    private formData: appointment = {
        type: AppointmentType.REALSTATE,
        user_id: '',
        date: ''
    }

    constructor(props: any) {
        super(props)

        this.errors = {
            date: []
        }
    }

    @Prop({ default: AppointmentType.REALSTATE }) type!: AppointmentType

    @Watch('user', { deep: true })
    userChanged() {
        this.updateUserID()
    }

    mounted() {
        this.updateUserID()

        this.formData.type = this.type

        if (this.type == AppointmentType.RENT)
            this.formData.rent_id = this.$route.params.id
        else
            this.formData.realstate_id = this.$route.params.id
    }

    render(): VNode {
        const minDate: string = moment().add(1, 'day').format('YYYY-MM-DD') + 'T00:00'
        const maxDate: string = moment().add(1, 'month').format('YYYY-MM-DD') + 'T00:00'

        return <div class="appointment">
            <h2>Get an appointment</h2>
            <p>You can choose a date to vist for Property</p>
            <form action="#" novalidate onSubmit={this.formSubmit}>
                <div class={{ 'form__group': true, 'input--invalid': this.errors.date.length > 0 }}>
                    <label for="date">Choose a date</label>
                    <input type="datetime-local" name="date" id="date" placeholder="Choose a date" max={maxDate} min={minDate} v-model={this.formData.date} />
                    {this.errors.date.length > 0 ? (<span class="input__text">{this.errors.date[0]}</span>) : null}
                </div>
                <div className="btn__holder text--right">
                    <button class="btn btn__primary">Request</button>
                </div>
            </form>
        </div>
    }

    async formSubmit(event: HTMLFormElement) {
        event.preventDefault()

        await validate(this.formData.date, 'required', { name: 'date' })
            .then(result => {
                this.errors['date'] = result.errors
            })

        this.$nextTick(async () => {
            if (!this.hasError) {
                this.saving = true

                try {
                    const data = await this.requestAppointment(this.formData)

                    if (data) {
                        this.$emit('close')
                    } else {
                        this.errors = { ...this.errors, ...this.errorList }
                    }

                } finally {
                    this.saving = false
                }
            }
        })
    }

    updateUserID() {
        if (this.user.uuid)
            this.formData.user_id = this.user.uuid
    }
}
import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import { iRent } from '@/interfaces/app'
import { appointment, AppointmentType } from '@/interfaces/appointment'

import Modal from '@/components/common/Modal'
import Appointment from '@/components/realstate/Appointment'

@Component({
    methods: {
        ...mapActions({
            getRent: 'rent/getRent',
            checkAppointment: 'appointment/checkAppointment',
        })
    }
})
export default class RentDetail extends Vue {
    private isLoading: boolean = false
    private showAvailabilityModal: boolean = false

    private getRent!: (id: string) => iRent
    private checkAppointment!: (payload: { type: string, id: string }) => any
    private appointment: appointment | null = null

    private rent: iRent = {
        name: '',
        description: '',
        excerpt: '',
        machinery: '',
        price: ''
    }

    @Watch('$route', { deep: true })
    routeWatcher() {
        this.checkRoute()
    }

    mounted() {
        this.checkRoute()
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                {!this.isLoading
                    ? <div class="item__detail">
                        {this.appointment && Object.keys(this.appointment).length > 0
                            ? <div class="meta__info">
                                <p>Your appointment for this propperty has <span class="text--primary">{this.appointment.status}</span> status. You will soon get updates</p>
                            </div>
                            : <div class="text--right mb-4">
                                <a href="#" class="btn btn__xs btn__primary" onClick={(event: MouseEvent) => {
                                    event.preventDefault()
                                    this.showAvailabilityModal = true
                                }}>Request Appointment</a>
                            </div>}
                        <div class="item__detail__description">
                            <h2 class="title">{this.rent.name}</h2>
                            <div class="holder">
                                <em class="price">Rs.{this.rent.price}</em>
                                <strong class="sub__heading">{this.rent.machinery}</strong>
                            </div>
                            <div class="text__holder" domPropsInnerHTML={this.rent.description} />
                        </div>
                    </div>
                    : null
                }
                <Modal v-model={this.showAvailabilityModal}>
                    <Appointment type={AppointmentType.RENT} onClose={() => { this.showAvailabilityModal = false }} />
                </Modal>
            </section>
        </main>)
    }

    async checkRoute() {
        this.isLoading = true
        const id = this.$route?.params?.id

        this.rent = await this.getRent(id)
        this.appointment = await this.checkAppointment({ type: AppointmentType.RENT, id })

        this.isLoading = false
    }
}

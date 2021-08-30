import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import Slick from 'vue-slick'

import { iImage, iRealState } from '@/interfaces/app'
import { appointment } from '@/interfaces/appointment'

import RealestateCollection from '@/components/realstate/Collection'
import RealestateService from '@/components/realstate/Services'
import Modal from '@/components/common/Modal'
import Appointment from '@/components/realstate/Appointment'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true
}

@Component({
    methods: {
        ...mapActions({
            getProperty: 'realstate/getProperty',
            checkAppointment: 'appointment/checkAppointment',
        })
    }
})
export default class RealstateDetail extends Vue {
    private isLoading: boolean = false
    private appointment: appointment | null = null

    private getProperty!: (id: string) => iRealState
    private checkAppointment!: (realstate_id: string) => any
    private showAvailabilityModal: boolean = false
    private property: iRealState = {
        location: '',
        rate: '',
        unit: '',
        excerpt: '',
        description: '',
    }

    async mounted() {
        this.isLoading = true
        const id = this.$route?.params?.id
        this.property = await this.getProperty(id)
        this.appointment = await this.checkAppointment(id)

        this.isLoading = false

        setTimeout(() => {
            (this.$refs?.propertyDetailSlick as any)?.reSlick()
        }, 500)
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <div class="item__detail">
                    {!this.isLoading
                        ? [
                            this.appointment && Object.keys(this.appointment).length > 0
                                ? <div class="meta__info">
                                    <p>Your appointment for this propperty has <span class="text--primary">{this.appointment.status}</span> status. You will soon get updates</p>
                                </div>
                                : <div class="text--right mb-4">
                                    <a href="#" class="btn btn__xs btn__primary" onClick={(event: MouseEvent) => {
                                        event.preventDefault()
                                        this.showAvailabilityModal = true
                                    }}>Request Appointment</a>
                                </div>,
                            this.property.images
                                ? <Slick class="item__detail__image" options={slickOpt} ref="propertyDetailSlick">
                                    {this.property.images?.map((image: iImage) => (<img src={image.image_url} alt={this.property.name} />))}
                                </Slick>
                                : null,
                            <div class="item__detail__description">
                                <h2>{this.property.location}</h2>
                                <div class="text__holder" domPropsInnerHTML={this.property.description} />
                                {this.property.detail ? (<RealestateService item={this.property.detail} />) : null}
                            </div>
                        ]
                        : null}
                </div>
            </section>
            <RealestateCollection />
            <Modal v-model={this.showAvailabilityModal}>
                <Appointment onClose={() => { this.showAvailabilityModal = false }} />
            </Modal>
        </main>)
    }
}

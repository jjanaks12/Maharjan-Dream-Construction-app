import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iRent } from '@/interfaces/app'
import { appointment, AppointmentType } from '@/interfaces/appointment'
import { formatDate } from '@/plugins/filter'
import { iUserDetail } from '@/interfaces/auth'

import Modal from '@/components/common/Modal'
import Appointment from '@/components/realstate/Appointment'
import RentCreate from '@/components/rent/Create'
import RentDescription from '@/components/rent/Description'

@Component({
    computed: {
        ...mapGetters({
            user: 'root/getLoggedinUser'
        })
    },
    methods: {
        ...mapActions({
            getRent: 'rent/getRent',
            deleteRent: 'rent/destory',
            checkAppointment: 'appointment/checkAppointment',
            save: 'rent/save'
        })
    }
})
export default class RentDetail extends Vue {
    private isLoading: boolean = false
    private isDeleting: boolean = false
    private showAvailabilityModal: boolean = false
    private showEditForm: boolean = false

    private user!: iUserDetail
    private getRent!: (id: string) => iRent
    private save!: (formData: iRent) => Promise<boolean>
    private deleteRent!: (id: string) => Promise<boolean>
    private checkAppointment!: (payload: { type: string, id: string }) => any
    private appointment: appointment | null = null

    private rent: iRent = {
        name: '',
        description: '',
        excerpt: '',
        machinery: '',
        price: ''
    }

    get isMine(): boolean {
        return this.rent.users && this.rent.users[0]
            ? this.rent.users[0].id === this.user.id
            : false
    }

    mounted() {
        this.init()
    }

    async init() {
        this.isLoading = true
        const id = this.$route?.params?.id
        this.rent = await this.getRent(id)
        this.appointment = await this.checkAppointment({ type: AppointmentType.RENT, id })

        this.isLoading = false
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <div class="item__detail">
                    {!this.isLoading
                        ? [
                            //= Item header
                            <header class="item__header">
                                {this.rent.published
                                    ? this.isMine
                                        ? <span class="status status__success">published</span>
                                        : <span class="status status__success">{formatDate(this.rent.created_at)}</span>
                                    : <a href="#" class="btn btn__xs btn__success" onClick={this.publishProperty}>Publish Now</a>
                                }
                                <div class="item__action">
                                    {this.isMine
                                        ? [
                                            <a href="#" onClick={(event: MouseEvent) => {
                                                event.preventDefault()
                                                this.showEditForm = true
                                            }}><span class="icon-edit"></span></a>,
                                            <a href="#" onClick={(event: MouseEvent) => {
                                                event.preventDefault()

                                                this.isDeleting = true
                                            }}><span class="icon-trash"></span></a>
                                        ]
                                        : null
                                    }
                                    {/* Back to detail Page */}
                                    <router-link to={{ name: 'rent' }} class="back"><span class="icon-d-arrow-left"></span></router-link>
                                </div>
                            </header>,

                            // If there is some appointment
                            this.appointment && Object.keys(this.appointment).length > 0
                                ? <div class="meta__info">
                                    <p>Your appointment for this propperty has <span class="text--primary">{this.appointment.status}</span> status. You will soon get updates</p>
                                </div>
                                : null,

                            // if the property is mine
                            !this.isMine
                                ? <div className="item__detail__header">
                                    <div class="text--right mb-4">
                                        <a href="#" class="btn btn__xs btn__primary" onClick={(event: MouseEvent) => {
                                            event.preventDefault()
                                            this.showAvailabilityModal = true
                                        }}>Request Appointment</a>
                                    </div>
                                </div>
                                : null,

                            // property's detail information
                            <div class="item__detail__description">
                                <h2 class="title">{this.rent.name}</h2>
                                <div class="holder">
                                    <em class="price">Rs.{this.rent.price}</em>
                                    <strong class="sub__heading">{this.rent.machinery}</strong>
                                </div>
                                {this.isMine
                                    ? <RentDescription rent={this.rent} onUpdate={() => { this.init() }} />
                                    : <div class="text__holder" domPropsInnerHTML={this.rent.description} />}

                            </div>
                        ]
                        : null
                    }
                </div>
                <Modal v-model={this.isDeleting}>
                    <h3>You are about to delete this property</h3>
                    <p>Are you sure you want to delete this property. Once deleted You would not ne able undo it.</p>
                    <a href="#" class="btn btn__xs btn__primary" onClick={this.deleteRental}>Yes</a>
                </Modal>
            </section>

            {!this.isMine
                ? [
                    <Modal v-model={this.showAvailabilityModal}>
                        <Appointment type={AppointmentType.RENT} onClose={() => { this.showAvailabilityModal = false }} />
                    </Modal>
                ]
                : [
                    <Modal v-model={this.showEditForm}>
                        <RentCreate detail={this.rent} onClose={() => {
                            this.showEditForm = false
                            this.init()
                        }} />
                    </Modal>
                ]
            }
        </main>)
    }

    deleteRental(event: MouseEvent) {
        event.preventDefault()

        if (this.rent.id)
            this.deleteRent(this.rent.id)
                .then(() => {
                    this.$router.push({ name: 'rent' })
                })
    }

    publishProperty(event: MouseEvent) {
        event.preventDefault()

        this.save({
            id: this.rent.id,
            description: this.rent.description,
            excerpt: this.rent.excerpt,
            machinery: this.rent.machinery,
            name: this.rent.name,
            price: this.rent.price,
            published: true
        })
            .then(() => {
                this.init()
            })
    }
}

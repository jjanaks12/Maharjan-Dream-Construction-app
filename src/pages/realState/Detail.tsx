import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import Slick from 'vue-slick'

import { iImage, iRealState } from '@/interfaces/app'
import { appointment, AppointmentType } from '@/interfaces/appointment'
import { iUserDetail } from '@/interfaces/auth'
import RealstateLoading from '@/components/realstate/Loading'

import RealestateService from '@/components/realstate/Services'
import Modal from '@/components/common/Modal'
import Appointment from '@/components/realstate/Appointment'
import CollectionDetail from '@/components/collection/Detail'
import RealstateCreate from '@/components/realstate/Create'
import PropertyImageUpload from '@/components/realstate/ImageUpload'
import RealstateDescription from '@/components/realstate/Description'
import ServiceDetail from '@/components/realstate/ServiceDetail'
import { formatDate } from '@/plugins/filter'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true
}

@Component({
    computed: {
        ...mapGetters({
            user: 'root/getLoggedinUser'
        })
    },
    methods: {
        ...mapActions({
            getProperty: 'realstate/getProperty',
            deleteRealstate: 'realstate/destory',
            checkAppointment: 'appointment/checkAppointment',
            fetchCollection: 'collection/fetch',
            save: 'realstate/save'
        })
    }
})
export default class RealstateDetail extends Vue {
    private isLoading: boolean = false
    private isDeleting: boolean = false
    private appointment: appointment | null = null
    private showCollection: boolean = false
    private showEditForm: boolean = false

    private user!: iUserDetail
    private getProperty!: (id: string) => iRealState
    private deleteRealstate!: (id: string) => Promise<boolean>
    private checkAppointment!: (payload: { type: string, id: string }) => any
    private fetchCollection!: () => any
    private save!: (formData: iRealState) => Promise<boolean>
    private showAvailabilityModal: boolean = false
    private property: iRealState = {
        location: '',
        rate: '',
        unit: '',
        excerpt: '',
        description: '',
    }

    get isMine(): boolean {

        return this.property.users && this.property.users[0]
            ? this.property.users[0].id === this.user.id
            : false
    }

    mounted() {
        this.init()
    }

    async init() {
        this.isLoading = true
        const id = this.$route?.params?.id
        this.property = await this.getProperty(id)
        this.appointment = await this.checkAppointment({ type: AppointmentType.REALSTATE, id })
        this.fetchCollection()

        this.isLoading = false

        setTimeout(() => {
            (this.$refs?.propertyDetailSlick as any)?.reSlick()
        }, 500)
    }

    render(): VNode {
        return <main id="main">
            <section class="item__section">
                <div class="item__detail">
                    {!this.isLoading
                        ? [
                            //= Item header
                            <header class="item__header">
                                {this.property.published
                                    ? this.isMine
                                        ? <span class="status status__success">published</span>
                                        : <span class="status status__success">{formatDate(this.property.created_at)}</span>
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
                                    <router-link to={{ name: 'realstate' }} class="back"><span class="icon-d-arrow-left"></span></router-link>
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
                                ? <div class="item__detail__header">
                                    <a href="#" class="btn btn__xs btn__success" onClick={(event: MouseEvent) => {
                                        event.preventDefault()
                                        this.showCollection = true
                                    }}>add to collection</a>

                                    {!(this.appointment && Object.keys(this.appointment).length > 0)
                                        ? <a href="#" class="btn btn__xs btn__primary" onClick={(event: MouseEvent) => {
                                            event.preventDefault()
                                            this.showAvailabilityModal = true
                                        }}>Request Appointment</a>
                                        : null}
                                </div>
                                : <div class="images">
                                    <PropertyImageUpload property={this.property} onUpdate={() => {
                                        this.init()
                                    }} />
                                </div>,

                            // if property has images show slick slider
                            this.property.images && this.property.images.length > 0 && !this.isMine
                                ? <Slick class="item__detail__image" options={slickOpt} ref="propertyDetailSlick">
                                    {this.property.images?.map((image: iImage) => (<img src={image.image_url} alt={this.property.name} />))}
                                </Slick>
                                : null,

                            // property's detail information
                            <div class="item__detail__description">
                                <h2>{this.property.location}</h2>
                                {this.isMine
                                    ? <RealstateDescription property={this.property} onUpdate={() => { this.init() }} />
                                    : <div class="text__holder" domPropsInnerHTML={this.property.description} />
                                }

                                {this.property.detail
                                    ? this.isMine
                                        ? <ServiceDetail property={this.property} onUpdate={() => { this.init() }} />
                                        : <RealestateService item={this.property.detail} />
                                    : null}
                            </div>,


                        ]

                        // showing Skeleton loading animation
                        : <RealstateLoading />}
                    <Modal v-model={this.isDeleting}>
                        <h3>You are about to delete this property</h3>
                        <p>Are you sure you want to delete this property. Once deleted You would not ne able undo it.</p>
                        <a href="#" class="btn btn__xs btn__primary" onClick={this.deleteProperty}>Yes</a>
                    </Modal>
                </div>
            </section>

            {!this.isMine
                ? [
                    <Modal v-model={this.showAvailabilityModal}>
                        <Appointment onClose={() => { this.showAvailabilityModal = false }} />
                    </Modal>,
                    <Modal v-model={this.showCollection}>
                        <CollectionDetail onClose={() => { this.showCollection = false }} />
                    </Modal>
                ]
                : [
                    <Modal v-model={this.showEditForm}>
                        <RealstateCreate detail={this.property} onClose={() => {
                            this.showEditForm = false
                            this.init()
                        }} />
                    </Modal>
                ]
            }
        </main>
    }

    deleteProperty(event: MouseEvent) {
        event.preventDefault()

        if (this.property.id)
            this.deleteRealstate(this.property.id)
                .then(() => {
                    this.$router.push({ name: 'realstate' })
                })
    }

    publishProperty(event: MouseEvent) {
        event.preventDefault()

        this.save({
            id: this.property.id,
            description: this.property.description,
            excerpt: this.property.excerpt,
            location: this.property.location,
            rate: this.property.rate,
            unit: this.property.unit,
            published: true
        })
            .then(() => {
                this.init()
            })
    }
}

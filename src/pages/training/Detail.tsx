import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import { iTraining } from '@/interfaces/app'
import moment from 'moment'

@Component({
    methods: {
        ...mapActions({
            getTraining: 'training/getTraining',
            enroll: 'training/enroll',
            isEnrolled: 'training/isEnrolled',
        })
    }
})
export default class TrainingDetail extends Vue {
    private getTraining!: (id: number) => iTraining
    private isEnrolled!: (training: iTraining) => Promise<boolean>
    private enroll!: (training: iTraining) => Promise<boolean>
    private hasEnrolled: boolean = false

    private training: iTraining = {
        title: '',
        excerpt: '',
        description: '',
        duration: '',
        duration_type: '',
        price: '',
        start_date: '',
    }

    @Watch('$route', { deep: true })
    routeWatcher() {
        this.checkRoute()
    }

    @Watch('training')
    trainingUpdated() {
        if (this.training.id) {
            this.checkEnrolled()
        }
    }

    mounted() {
        this.checkRoute()
    }

    get remainingDay(): number {
        return moment(this.training.start_date).diff(moment(), 'days')
    }

    render(): VNode {
        return (<main id="main">
            <section class="item__section training__section">
                <div class="item__detail">
                    <div class="item__detail__description">
                        <h1 class="title">{this.training.title}</h1>
                        <div class="holder">
                            <em class="price"><span>Rs. {this.training.price}</span> for {this.training.duration}{this.training.duration_type}</em>
                            <span class="date">Starts on {moment(this.training.start_date).local().format('Do [of] MMM, [at] hh:mm a')}</span>
                        </div>
                        <div class="text__holder" domPropsInnerHTML={this.training.description} />
                    </div>
                </div>
                <footer class="item__section__footer">
                    {this.hasEnrolled
                        ? null
                        : this.remainingDay > 0
                            ? [
                                <span class="day__count">{this.remainingDay} day{this.remainingDay > 1 ? 's' : ''} left till Training starts</span>,
                                <a href="#" class="btn btn__success btn__xs" onClick={(event: MouseEvent) => {
                                    event.preventDefault()
                                    this.enroll(this.training)
                                        .then(() => {
                                            this.checkEnrolled()
                                        })
                                }}>Enroll now</a>
                            ]
                            : <div class="notice">
                                <strong>This training is over</strong>
                                <p>Please wait for new date release.</p>
                            </div>
                    }
                </footer>
            </section>
        </main>)
    }

    async checkRoute() {
        const id = parseInt(this.$route?.params?.id)
        this.training = await this.getTraining(id)
    }

    async checkEnrolled() {
        await this.isEnrolled(this.training)
            .then((data) => {
                
                if (data) {
                    this.hasEnrolled = true
                    this.$forceUpdate()
                }
            })
    }
}

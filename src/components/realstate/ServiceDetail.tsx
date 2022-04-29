import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { iRealState, iService } from "@/interfaces/app"
import { mapActions } from "vuex"

interface aService {
    title: string,
    value: number
}

@Component({
    methods: {
        ...mapActions({
            save: 'realstate/save'
        })
    }
})
export default class ServiceDetail extends Vue {
    private detail: Array<aService> = []
    private isSaving: boolean = false
    private save!: (formData: iRealState) => Promise<boolean>

    constructor(props: any) {
        super(props)
    }

    @Prop() property!: iRealState

    mounted() {
        if (this.property.detail && Object.keys(this.property.detail).length > 0) {
            const services: iService = this.property.detail

            Object.keys(services).forEach((key: string) => {
                this.detail.push({
                    title: key,
                    value: services[key]
                })
            });
        }
    }

    get hasChanged(): boolean {
        return this.property.detail ? Object.keys(this.property.detail).length !== this.detail.length : false
    }

    render(): VNode {
        return <section class="utility__section">
            <header class="utility__header">
                <h3>Services</h3>
                <div class="utility__action">
                    <a href="#" onClick={this.addNewService}><span class="icon-plus"></span></a>
                </div>
            </header>
            <div class="utility__list">
                {this.detail.map((service: aService, index: number) => {
                    return <div class="utility__item">
                        <input type="text" v-model={service.title} />
                        <input type="text" v-model={service.value} />
                        <a href="#" onClick={(event: MouseEvent) => {
                            event.preventDefault()
                            this.removeService(index)
                        }}><span class="icon-trash"></span></a>
                    </div>
                })}
            </div>
            {this.hasChanged
                ? <footer class="utility__footer">
                    <a href="#" class="btn btn__xs btn__success" onClick={this.saveDetail}>
                        {this.isSaving
                            ? <span class="icon-spinner animate"></span>
                            : null}
                        save
                    </a>
                </footer>
                : null}
        </section>
    }

    addNewService(event: MouseEvent) {
        event.preventDefault()

        this.detail.push({
            title: '',
            value: 1
        })
    }

    removeService(index: number) {
        this.detail.splice(index, 1)
    }

    saveDetail(event: MouseEvent) {
        event.preventDefault()
        this.isSaving = true

        const detail = this.detail.reduce((acc: iService, service: aService) => ({ ...acc, [service.title]: Number(service.value) }), {})

        this.save({
            id: this.property.id,
            description: this.property.description,
            excerpt: this.property.excerpt,
            location: this.property.location,
            rate: this.property.rate,
            unit: this.property.unit,
            detail
        })
            .then(() => {
                this.$emit('update')
            })
            .finally(() => {
                this.isSaving = false
            })
    }
}
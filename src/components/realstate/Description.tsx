import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VNode } from 'vue'
import TextEditor from '../common/TextEditor'
import { mapActions } from 'vuex'
import { iRealState } from '@/interfaces/app'

let timer: any

@Component({
    methods: {
        ...mapActions({
            save: 'realstate/save'
        })
    }
})
export default class RealstateDescription extends Vue {
    private description: string = ''
    private isSaving: boolean = false

    private save!: (formData: iRealState) => Promise<boolean>

    @Prop({ required: true }) property!: iRealState

    @Watch('description')
    onDescriptionChange(newChange: string, oldchange: string) {

        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            if (oldchange != '' && newChange !== oldchange) {
                this.isSaving = true

                this.save({
                    id: this.property.id,
                    description: this.description,
                    excerpt: this.property.excerpt,
                    location: this.property.location,
                    rate: this.property.rate,
                    unit: this.property.unit,
                })
                    .then(() => {
                        this.$emit('update')
                    })
                    .finally(() => {
                        this.isSaving = false
                    })
            }
        }, 5000)
    }

    mounted() {
        this.description = this.property.description
    }

    constructor(props: any) {
        super(props)
    }

    render(): VNode {
        return <div class="editor__wrapper">
            {this.isSaving
                ? <span class="icon-spinner animate"></span>
                : null
            }
            <TextEditor v-model={this.description} />
        </div>
    }
}
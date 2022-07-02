import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import TextEditor from "../common/TextEditor";
import { iRent } from '@/interfaces/app';
import { mapActions } from "vuex";

let timer: any
@Component({
    methods: {
        ...mapActions({
            save: 'rent/save'
        })
    }
})
export default class RentDescription extends Vue {
    private description: string = ''
    private isSaving: boolean = false

    private save!: (formData: iRent) => Promise<boolean>

    @Prop({ required: true }) rent!: iRent

    @Watch('description')
    onDescriptionChange(newChange: string, oldchange: string) {

        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            if (oldchange != '' && newChange !== oldchange) {
                this.isSaving = true

                this.save({
                    id: this.rent.id,
                    description: this.description,
                    excerpt: this.rent.excerpt,
                    machinery: this.rent.machinery,
                    name: this.rent.name,
                    price: this.rent.price,
                    published: true
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
        this.description = this.rent.description
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
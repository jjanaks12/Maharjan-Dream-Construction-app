import { VNode } from "vue"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component
export default class Modal extends Vue {

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) value!: boolean

    @Watch('value')
    valueChanged() {
        if (this.value)
            document.body.style.overflow = 'hidden'
        else
            document.body.style.overflow = ''
    }

    render(): VNode {
        return <div class={{ "modal": true, "modal--active": this.value }} onClick={(event: MouseEvent) => {
            event.preventDefault()
            this.$emit('input', false)
        }}>
            <div class="modal__holder" onClick={(event: MouseEvent) => {
                event.stopPropagation()
            }}>
                <div class="modal__body">
                    {this.$slots.default}
                </div>
                <footer class="modal__footer">
                    <button class="btn btn__default btn__xs" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.$emit('input', false)
                    }}>close</button>
                </footer>
            </div>
        </div>
    }
}
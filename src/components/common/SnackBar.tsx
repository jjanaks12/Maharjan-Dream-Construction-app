import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SnackBar extends Vue {
    @Prop({ required: true }) message!: string

    constructor(props: any) {
        super(props)
    }

    get show(): boolean {
        return typeof this.message === 'string'
    }

    /** 
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<div class={{ "message": true, "message--show": this.show }}>
            <div class="text__holder">
                <p>{this.message}</p>
            </div>
            <button type="button" onClick={(event: MouseEvent) => {
                event.preventDefault()
                this.$store.commit('root/SET_ERROR_MESSAGE', '')
            }}>
                <span class="sr-only">Dismiss</span>
                <span class="icon-close"></span>
            </button>
        </div>)
    }

    closeBar(event: MouseEvent): void {
        event.preventDefault()
    }
}

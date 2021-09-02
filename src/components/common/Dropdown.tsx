import { VNode } from 'vue/types/umd'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Dropdown extends Vue {
    private isActive: boolean = false

    constructor(props: any) {
        super(props)
    }

    @Prop({ type: Function, default: () => { } }) opener!: () => VNode
    @Prop({ default: false }) value!: boolean

    @Watch('value')
    valueChanged() {
        this.isActive = this.value
        this.$forceUpdate()
    }

    render(): VNode {
        return (<div class={{
            "dropdown": true,
            "dropdown--active": this.isActive
        }} v-click-outside={() => {
            this.isActive = false
            this.$emit('input', this.isActive)
        }}>
            <a href="#" class="dropdown__opener" onClick={(event: MouseEvent) => {
                event.preventDefault()
                this.isActive = !this.isActive
                this.$emit('input', this.isActive)
            }}>
                {this.opener()}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </a>
            <div class="dropdown__holder">
                {this.$slots.default}
            </div>
        </div>)
    }
}
import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class TabItem extends Vue {
    private isActive: boolean = false

    constructor(props: any) {
        super(props)
    }

    @Prop({ default: 'Tab' }) title!: string
    @Prop({ default: false }) active!: boolean

    mounted() {
        this.isActive = this.active
    }

    render(): VNode {
        return <div>
            {this.$slots.default}
        </div>
    }
}
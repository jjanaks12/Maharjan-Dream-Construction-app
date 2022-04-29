import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import TabItem from "./Item"


@Component
export default class Tab extends Vue {
    private currentTab: number = 0
    private tabs: Array<TabItem> = []

    constructor(props: any) {
        super(props)
    }

    async mounted() {
        this.tabs = this.$children as Array<TabItem>

        this.tabs.forEach((tab: Vue, index: number) => {
            if (tab.$props.active) {
                this.currentTab = index
            }
        })
    }

    render(): VNode {
        return <div class="tabs">
            <ul class="tab__list">
                {this.tabs.map((tab: any, index: number) => <li class={{ 'tab--active': this.currentTab === index }}>
                    <a href="#" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.selectTab(index)
                    }}>{tab.$props.title}</a>
                </li>)}
            </ul>
            <div class="tab__content">
                {this.$slots.default?.map((component: VNode) => component)}
            </div>
        </div>
    }

    selectTab(pointer: number) {
        this.currentTab = pointer

        this.tabs.forEach((tab: any, index: number) => {
            tab.isActive = index === pointer
        })

        this.$emit('change', this.tabs[pointer].title)
    }
}
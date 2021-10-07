import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"


@Component
export default class Tab extends Vue {
    private currentTab: number = 0
    private tabs: Array<Vue> = []

    async mounted() {
        this.tabs = this.$children

        try {
            await this.tabs.forEach((tab: Vue, index: number) => {
                if (tab.$props.active) {
                    this.currentTab = index
                    throw ''
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    render(): VNode {
        return <div class="px-4 py-5 bg-gray-900 space-y-6 sm:p-6 text-gray-700 rounded-md overflow-hidden">
            <ul class="flex space-x-4 pb-3 border-b border-dashed border-gray-600">
                {this.tabs.map((tab: Vue, index: number) => <li class={{ 'text-yellow-300': this.currentTab === index }}>
                    <a href="#" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.currentTab = index
                    }}>{tab.$props.title}</a>
                </li>)}
            </ul>
            <div class="min-h-screen">
                {this.$slots.default?.map((component: VNode, index: number) => <div key={index} class={{ "": true, "hidden": this.currentTab !== index }}>{component}</div>)}
            </div>
        </div>
    }
}
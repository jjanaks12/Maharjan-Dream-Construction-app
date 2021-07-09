import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SnackBar extends Vue {
    @Prop({ required: true }) message!: string

    constructor(props: any) {
        super(props)
    }

    /** 
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<div class="w-96 bg-red-900 fixed rounded-lg bottom-7 right-10 alert py-3 px-3">
            <div class="flex items-center justify-between flex-wrap">
                <div class="w-0 flex-1 flex items-center">
                    <p class="text-white truncate">{this.message}</p>
                </div>
                {/* <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                    <button type="button" class="-mr-1 flex p-2 rounded-md hover:bg-red-800 focus:outline-none">
                        <span class="sr-only">Dismiss</span>
                        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div> */}
            </div>
        </div>)
    }

    closeBar(event: MouseEvent): void {
        event.preventDefault()
    }
}

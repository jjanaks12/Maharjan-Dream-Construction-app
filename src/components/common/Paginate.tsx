import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Paginate extends Vue {
    @Prop({ required: true }) current!: number
    @Prop({ required: true }) total!: number
    @Prop({ default: 3 }) max!: number

    constructor(props: any) {
        super(props)
    }

    get pages(): Array<number> {
        const half: number = Math.round(this.max / 2)
        let to: number = this.max

        if (this.current + half >= this.total)
            to = this.total
        else if (this.current > half)
            to = this.current + half

        return Array.from({ length: Math.min(this.max, this.total) }, (_, i) => (i + 1) + to - this.max)
    }

    /** 
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<nav class="pagination flex justify-between items-center space-x-2 pt-5">
            {this.total > 1 ? <ul class="flex items-center space-x-2">
                {this.current > 1 ? <li><a href="#" onClick={this.prev}>prev</a></li> : null}
                {this.pages.map((pageno: number) => <li>
                    {pageno === this.current ? <strong class="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-full">{pageno}</strong> : <a href="#" class="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full" onClick={(event: MouseEvent) => { event.preventDefault(); this.goto(pageno) }}>{pageno}</a>}
                </li>)}
                {this.current < this.total ? <li><a href="#" onClick={this.next}>next</a></li> : null}
            </ul> : null}
        </nav>)
    }

    next(event: MouseEvent): void {
        event.preventDefault()
        this.$emit('next')
    }

    prev(event: MouseEvent): void {
        event.preventDefault()
        this.$emit('prev')
    }

    goto(pageNo: number): void {
        this.$emit('goto', pageNo)
    }
}

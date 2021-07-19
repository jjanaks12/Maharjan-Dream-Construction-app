import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SearchForm extends Vue {
    private searchText: string = ""

    constructor(props: any) {
        super(props)
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<form action="#" class="search__form" method="POST" onSubmit={this.formSubmmited}>
            <div class="form__group">
                <label for="search">Address, suburb, postcard, or state</label>
                <input type="text" name="search" id="search" placeholder="Address, suburb, postcard or state" v-model={this.searchText} />
            </div>
            <button type="submit"><span class="icon-search"></span></button>
            <button type="button" class="btn__cancel" onClick={this.searchCancelled}><span class="icon-close"></span></button>
        </form>)
    }

    formSubmmited(event: HTMLFormElement): void {
        event.preventDefault()

        if (this.searchText)
            console.log(this.searchText)
    }

    searchCancelled(event: MouseEvent): void {
        event.preventDefault()

        this.$emit('close', event)
        this.$router.go(-1)
    }
}

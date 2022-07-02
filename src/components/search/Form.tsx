import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

let timer: any

const searchText: { [propName: string]: string } = {
    realstate: 'Address, suburb, postcard or state',
    rent: 'Search for rent',
    training: 'Search for training',
    resturant: 'Search for Resturant',
}

@Component({
    computed: {
        ...mapGetters({
            currentPage: 'root/getCurrentPage',
        })
    },
    methods: {
        ...mapActions({
            searchRealstate: 'realstate/search',
            searchRent: 'rent/search',
            searchTraining: 'training/search',
            searchMaterial: 'material/search',
            searchMenu: 'resturant/menuSearch',
        })
    }
})
export default class SearchForm extends Vue {
    private searchText: string = ""

    private currentPage !: string
    private searchRealstate !: (text: string) => Promise<boolean>
    private searchRent!: (text: string) => Promise<void>
    private searchTraining!: (text: string) => Promise<void>
    private searchMaterial!: (text: string) => Promise<void>
    private searchMenu!: (text: string) => Promise<void>

    constructor(props: any) {
        super(props)
    }

    @Watch('$route.params', { deep: true })
    routeChanged() {
        this.searchText = this.$route.params.text
    }

    @Watch('searchText')
    searchTextChanged() {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            this.search()
        }, 500);
    }

    get searchPlaceholder(): string {
        return searchText[this.currentPage] ? searchText[this.currentPage] : 'search text here'
    }

    mounted() {
        const searchText = this.$route.params.text

        if (searchText) {
            this.searchText = searchText
            this.search()
        }
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<form action="#" class="search__form" method="POST" onSubmit={this.formSubmmited}>
            <div class="form__group">
                <label for="search">Address, suburb, postcard, or state</label>
                <input type="text" name="search" id="search" placeholder={this.searchPlaceholder} v-model={this.searchText} />
            </div>
            <button type="submit"><span class="icon-search"></span></button>
            <button type="button" class="btn__cancel" onClick={this.searchCancelled}><span class="icon-close"></span></button>
        </form>)
    }

    async formSubmmited(event: HTMLFormElement): Promise<void> {
        event.preventDefault()

        if (this.searchText)
            this.search()
    }

    searchCancelled(event: MouseEvent): void {
        event.preventDefault()

        this.$emit('close', event)
        this.$router.push({ name: this.currentPage })
    }

    async search() {
        if (this.currentPage == 'realstate') {
            await this.searchRealstate(this.searchText)
        } else if (this.currentPage === 'rent') {
            await this.searchRent(this.searchText)
        } else if (this.currentPage === 'training') {
            await this.searchTraining(this.searchText)
        } else if (this.currentPage === 'material') {
            await this.searchMaterial(this.searchText)
        } else if (this.currentPage === 'resturant') {
            await this.searchMenu(this.searchText)
        }
    }
}

import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CardLoading extends Vue {
    render(): VNode {
        return <div class="skeleton__loader">
            <div>
                <i />
            </div>
            <div>
                <strong></strong>
                <p></p>
            </div>
        </div>
    }
}
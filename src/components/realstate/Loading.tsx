import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
    render(): VNode {
        return <div class="skeleton__loader">
            <div>
                <span></span>
                <div>
                    <b></b>
                    <b></b>
                    <b></b>
                </div>
            </div>
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
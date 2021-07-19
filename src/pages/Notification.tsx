import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Notification extends Vue {

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div>notification</div>)
    }
}

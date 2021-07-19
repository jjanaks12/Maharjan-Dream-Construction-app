import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class RealestateService extends Vue {

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<div class="service__list">
            <div class="service__item">
                <span class="icon-bed"></span>
                <span class="text">+3</span>
            </div>
            <div class="service__item">
                <span class="icon-shower"></span>
                <span class="text">+2</span>
            </div>
            <div class="service__item">
                <span class="icon-car"></span>
                <span class="text">+1</span>
            </div>
        </div>)
    }
}

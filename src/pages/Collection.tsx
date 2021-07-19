import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import RealestateCollection from '@/components/realstate/Collection'

@Component
export default class Collection extends Vue {

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <h2>Collection</h2>
                    <div class="text__holder">
                        <p>Organise your saved properties.</p>
                        <a href="#" class="btn btn__block btn__danger">Create a Collection</a>
                    </div>
                </header>
                <RealestateCollection />
                <RealestateCollection />
            </section>
        </main>)
    }
}

import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import RealestateItem from '@/components/realstate/Item'

@Component
export default class SearchList extends Vue {
    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                <header class="item__section__heading">
                    <strong class="h2">Kavresthali <button type="button" class="btn__close"><span class="icon-close"></span></button></strong>
                </header>
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
                <RealestateItem />
            </section>
        </main>)
    }
}

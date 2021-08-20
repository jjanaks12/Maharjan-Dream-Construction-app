import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import moment from 'moment'

import { iUserDetail } from '@/interfaces/auth'
import EmailVerify from '@/components/account/verify'
import ProfileForm from '@/components/account/ProfileForm'
import Modal from '@/components/common/Modal'

@Component({
    computed: {
        ...mapGetters({
            userDetail: 'root/getLoggedinUser'
        })
    }
})
export default class AccountInfo extends Vue {
    private userDetail!: iUserDetail
    private showProfieForm: boolean = false

    get hasCitizenship(): boolean {
        return Boolean(this.userDetail.citizenship_front || this.userDetail.citizenship_back)
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <section class="item__section">
                {!this.userDetail.email_verified_at ? <EmailVerify /> : null}
                <header class="item__section__heading">
                    <h2 class="h3">{this.userDetail.name}</h2>
                    <a href="#" class="text--primary" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.showProfieForm = true
                    }}>edit</a>
                </header>
                <div class="user__image">
                    {this.userDetail.photo ? <img src={this.userDetail.photo_url} alt={this.userDetail.name} /> : <span class="icon-user" />}
                </div>
                <dl class="user__detail">
                    <dt>Email</dt>
                    <dd>{this.userDetail.email}</dd>
                    <dt>Address</dt>
                    <dd>{this.userDetail.address}</dd>
                    <dt>Phone</dt>
                    <dd>{this.userDetail.phone}</dd>
                    <dt>Email Verification</dt>
                    <dd><span class={{ 'verified': this.userDetail.email_verified_at }}>{this.userDetail.email_verified_at ? "verified" : "not verified"}</span></dd>
                    <dt>Date of Join</dt>
                    <dd><time datetime={moment(this.userDetail.created_at).local().format('YYYY-MM-DD HH:mm:ss')}>{moment(this.userDetail.created_at).local().format('Do [of] MMMM [in] YYYY')}</time></dd>
                    {this.hasCitizenship ? [<dt>Documents</dt>,
                    <dd>
                        <strong>Citizenship</strong>
                        <div class="image__list">
                            {this.userDetail.citizenship_front ? (<div class="image__holder">
                                <img src={this.userDetail.citizenship_front_url} alt={this.userDetail.name + "_citizenship_front"} />
                            </div>) : null}
                            {this.userDetail.citizenship_back ? (<div class="image__holder">
                                <img src={this.userDetail.citizenship_back_url} alt={this.userDetail.name + "_citizenship_back"} />
                            </div>) : null}
                        </div>
                    </dd>] : null}
                </dl>
            </section>
            <Modal v-model={this.showProfieForm}>
                <ProfileForm onClose={() => this.showProfieForm = false} />
            </Modal>
        </main>)
    }
}

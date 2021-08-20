import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { iUserDetail, resedEmail } from '@/interfaces/auth'

@Component({
    computed: {
        ...mapGetters({
            userDetail: 'root/getLoggedinUser'
        })
    },
    methods: {
        ...mapActions({
            resendEmail: 'root/resendEmail'
        })
    }
})
export default class EmailVerify extends Vue {
    private userDetail!: iUserDetail
    private isLoading: boolean = false
    private mailSent: boolean = false
    private resendEmail!: (formData: resedEmail) => Promise<boolean>

    constructor(props: any) {
        super(props)
    }

    /** 
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<div class="meta__info">
            {this.mailSent ? [
                <h3>We have sent you a mail</h3>,
                <p>Please check your inbox and verify it.</p>
            ] : (!this.isLoading ? [
                <h3 class="h4">Your account hasn't been verified</h3>,
                <p>If you did not get verification mail. <a href="#" onClick={this.requestEmail}>Want to resend?</a></p>
            ] : [
                <h3 class="h4">We are sending mail.</h3>,
                <p>Just a minute please. We will be done...</p>
            ])}
        </div>)
    }

    requestEmail(event: MouseEvent) {
        event.preventDefault()
        this.isLoading = true

        this.resendEmail({
            email: this.userDetail.email,
            url: location.origin + '/verification'
        })
            .then(() => {
                this.mailSent = true
            })
            .finally(() => {
                this.isLoading = false
            })
    }
}

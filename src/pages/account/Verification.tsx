import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import { verifyEmail } from '@/interfaces/auth'

@Component({
    methods: {
        ...mapActions({
            verifyEmail: 'root/verifyEmail'
        })
    }
})
export default class EmailVerification extends Vue {
    private verifyEmail!: (formData: verifyEmail) => Promise<boolean>

    mounted() {
        const code: string = this.$route.query.code as string
        const email: string = this.$route.query.email as string

        this.verifyEmail({
            code,
            email
        })
            .then(() => {
                this.$router.push({ name: 'account_info' })
            })
    }

    /**
     * @returns VNode
     */
    render(): VNode {
        return (<main id="main">
            <div>
                <h1>Your email is being verified.</h1>
                <p>Please wait till the process is finished</p>
            </div>
        </main>)
    }
}

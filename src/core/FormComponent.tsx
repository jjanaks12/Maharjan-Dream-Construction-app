import { iErrorMessage } from '@/interfaces/auth'
import { Component, Vue, Watch } from 'vue-property-decorator'

let timer: any
@Component
export default class FormComponent extends Vue {
    protected errors!: iErrorMessage

    @Watch('errors', { deep: true })
    errorWatcher() {
        if (timer)
            return

        timer = setTimeout(() => {
            this.resetErrorMessage()
        }, 7000)
    }

    /**
    * Checks if there are any errors
    * 
    * @returns boolean
    */
    get hasError(): boolean {
        return Object.keys(this.errors).reduce((acc: boolean, key: string): boolean => {
            return acc || this.errors[key].length > 0
        }, false)
    }

    get errorMessage(): string {
        let message: string = ''

        for (const field in this.errors) {
            if (this.errors[field].length > 0) {
                message = this.errors[field][0]
                return message
            }
        }
        return message
    }

    protected resetErrorMessage(): void {

        Object.keys(this.errors).forEach((key: string) => {
            this.errors[key] = []
        })
    }
}

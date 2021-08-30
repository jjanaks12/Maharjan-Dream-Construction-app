import { AxiosResponse } from "axios"
import { Action, Module, VuexModule } from "vuex-module-decorators"

import { appointment } from "@/interfaces/appointment"
import axios from "@/services/axios"

@Module
export default class Appointment extends VuexModule {
    @Action
    async requestAppointment(formData: appointment) {
        const { data }: AxiosResponse = await axios.post('appointment', formData)

        return data
    }

    @Action
    async checkAppointment(payload: { type: string, id: string }) {
        const { data }: AxiosResponse = await axios.get(`appointment/${payload.type}/${payload.id}`)

        return data
    }
}
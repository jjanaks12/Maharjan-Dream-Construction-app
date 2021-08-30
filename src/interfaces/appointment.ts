import { iUserDetail } from './auth'

export enum AppointmentStatus {
    REQUESTED = 'requested',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    // DELAYED = 'delayed',
}

export interface appointment {
    id?: string
    user_id: string
    realstate_id?: string
    rent_id?: string
    status?: AppointmentStatus
    user?: iUserDetail
    type: AppointmentType
    date: string
}

export enum AppointmentType {
    REALSTATE = 'realstate',
    RENT = 'rent'
}
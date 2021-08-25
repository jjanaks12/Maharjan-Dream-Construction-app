import { iMaterial } from './app'

export enum DeliveryType {
    local = 1,
    interstate = 2,
    international = 3
}

export interface formData {
    type: string
    product_id: number
    quantity: number
    delivery_date: string
    delivery_id: DeliveryType
    delivery_address: string
}

export interface iCart {
    id: number
    quantity: number
    material: iMaterial
    [propName: string]: any
}
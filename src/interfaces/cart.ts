import { iMaterial } from './app'

export interface formData {
    type: string
    delivery_id: string
    delivery_address: string
}

export interface iCart {
    id: number
    quantity: number
    material: iMaterial
    [propName: string]: any
}
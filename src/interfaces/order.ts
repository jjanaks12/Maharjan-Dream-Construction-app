import { APIResponse, iMaterial } from "./app";
import { iUserDetail } from "./auth";
import { iDelivery } from "./delivery";

export interface iOrder {
    id?: string
    user: iUserDetail
    type: string
    price: number
    ordered_at: string
    order_status: OrderStatus
    delivery: iDelivery
    delivery_date: string | null
    delivery_address: string
    delivery_charge: number
    total: number
    payment_status: PaymentStatus
    material: Array<iMaterial>
}

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    CANCELLED = 'cancelled',
    SHIPPED = 'shipped',
    COMPLETED = 'completed',
}

export enum PaymentStatus {
    UNPAID = 'unpaid',
    PAID = 'paid',
}

export const orderInit: APIResponse<iOrder> = {
    data: [],
    current_page: 0,
    per_page: 0,
    last_page: 0,
    total: 0,
}
import { iUserDetail } from '@/interfaces/auth';
import { RouteConfig } from 'vue-router';

export type newRouteConfig = RouteConfig & {
    meta: {
        layout: string
        type: string
    }
    [propName: string]: any
}

export interface RequestParams {
    [propName: string]: any
}

export interface RequestQuery {
    params?: RequestParams
}

export interface iMenu {
    name: string
    text: string
    icon: string
    path: string
    [propName: string]: any
}

export interface iImage {
    id?: string
    image_url: string,
    file?: ArrayBuffer | null
    [propName: string]: any
}

export interface iService {
    [propName: string]: number
}

export interface iRealStateResponse {
    data: Array<iRealState>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iRealState {
    id?: string
    location: string
    rate: string
    unit: string
    excerpt: string
    description: string
    created_at?: string
    images?: Array<iImage>
    detail?: iService
    users?: Array<iUserDetail>
    published?: boolean
    [propName: string]: any
}

export interface iMaterial {
    id?: string
    name: string
    description: string
    quantity: string
    measurement_unit: string
    created_at?: string
    price: number
    material_category_id: number | ''
    images?: Array<iImage>
    [propName: string]: any
}

export interface iRentResponse {
    data: Array<iRent>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iRent {
    id?: string
    name: string
    machinery: string
    excerpt: string
    description: string
    created_at?: string
    price: string
    published?: boolean
    users?: Array<iUserDetail>
    [propName: string]: any
}

export interface iTrainingResponse {
    data: Array<iTraining>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iTraining {
    id?: string
    title: string
    excerpt: string
    description: string
    duration: string
    duration_type: string
    price: string
    start_date: string
    [propName: string]: any
}

export interface APIResponse<T> {
    data: Array<T>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}
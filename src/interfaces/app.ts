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
    id?: number
    url: string,
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

export interface iMaterialResponse {
    data: Array<iMaterial>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iRealState {
    id?: number
    location: string
    rate: string
    unit: string
    excerpt: string
    description: string
    created_at?: string
    images?: Array<iImage>
    detail?: iService
    [propName: string]: any
}

export interface iMaterial {
    id?: number
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
    id?: number
    name: string
    machinery: string
    excerpt: string
    description: string
    created_at?: string
    price: string
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
    id?: number
    title: string
    excerpt: string
    description: string
    duration: string
    duration_type: string
    price: string
    start_date: string
    [propName: string]: any
}
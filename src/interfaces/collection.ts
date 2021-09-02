import { iRealState } from "@/interfaces/app"

export interface iCollectionResponse {
    data: Array<iCollection>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iCollection {
    id?: string
    title: string
    realstate?: Array<iRealState>
}
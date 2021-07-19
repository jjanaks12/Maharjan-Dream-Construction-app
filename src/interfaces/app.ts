import { RouteConfig } from 'vue-router';

export type newRouteConfig = RouteConfig & {
    meta: {
        layout: string
        type: string
    }
    [propName: string]: any
}

export interface iMenu {
    name: string
    text: string
    icon: string
    path: string
    [propName: string]: any
}
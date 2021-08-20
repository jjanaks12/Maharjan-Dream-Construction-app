import { newRouteConfig } from '@/interfaces/app'

const routes: Array<newRouteConfig> = [{
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/realstate',
    name: 'realstate',
    component: () => import('@/pages/realState/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/realstate/:id',
    name: 'realstate_detail',
    component: () => import('@/pages/realState/Detail'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/material',
    name: 'material',
    component: () => import('@/pages/material/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/material/:id',
    name: 'material_detail',
    component: () => import('@/pages/material/Detail'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/search',
    name: 'search',
    component: () => import('@/pages/search/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/searchDetail',
    name: 'search_detail',
    component: () => import('@/pages/search/Detail'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/searchList',
    name: 'search_list',
    component: () => import('@/pages/search/List'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/account/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/info',
    name: 'account_info',
    component: () => import('@/pages/account/Info'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/verification',
    name: 'account_verification',
    component: () => import('@/pages/account/Verification'),
    meta: {
        layout: 'simple',
        type: 'unauthorized'
    }
}, {
    path: '/change_password',
    name: 'change_password',
    component: () => import('@/pages/account/ChangePassword'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/notification',
    name: 'notification',
    component: () => import('@/pages/Notification'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/collection',
    name: 'collection',
    component: () => import('@/pages/Collection'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login'),
    meta: {
        layout: 'simple',
        type: 'unauthorized'
    }
}, {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/Register'),
    meta: {
        layout: 'simple',
        type: 'unauthorized'
    }
}, {
    path: '*',
    name: '404',
    component: () => import('@/pages/NotFound'),
    meta: {
        layout: 'simple',
        type: 'none'
    }
}]

export default routes
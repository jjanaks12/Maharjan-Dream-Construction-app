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
    component: () => import('@/pages/Account'),
    meta: {
        layout: 'default',
        type: 'nauthorized'
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
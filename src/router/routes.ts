import { newRouteConfig } from '@/interfaces/app'

const routes: Array<newRouteConfig> = [{
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}]

export default routes
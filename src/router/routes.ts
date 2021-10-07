import { newRouteConfig } from '@/interfaces/app'

const routes: Array<newRouteConfig> = [{
    path: '/',
    name: 'home',
    redirect: {
      name: 'realstate'
    },
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
    path: '/collection',
    name: 'collection',
    component: () => import('@/pages/collection/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
//     path: '/collection_detail/:id?',
//     name: 'collection_detail',
//     component: () => import('@/pages/collection/Detail'),
//     meta: {
//         layout: 'default',
//         type: 'authorized'
//     }
// }, {
    path: '/rent',
    name: 'rent',
    component: () => import('@/pages/rent/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/rent/:id',
    name: 'rent_detail',
    component: () => import('@/pages/rent/Detail'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/training',
    name: 'training',
    component: () => import('@/pages/training/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/training/:id',
    name: 'training_detail',
    component: () => import('@/pages/training/Detail'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/order',
    name: 'order',
    component: () => import('@/pages/Orders'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/search/:text?',
    name: 'search',
    component: () => import('@/pages/Search'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/resturant',
    name: 'resturant',
    component: () => import('@/pages/resturant/Index'),
    meta: {
        layout: 'default',
        type: 'authorized'
    }
}, {
    path: '/resturant_detail/:id',
    name: 'resturant_detail',
    component: () => import('@/pages/resturant/Detail'),
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
    path: '/forgot_password',
    name: 'forgot_password',
    component: () => import('@/pages/account/ForgotPassword'),
    meta: {
        layout: 'simple',
        type: 'unauthorized'
    }
}, {
    path: '/reset',
    name: 'reset',
    component: () => import('@/pages/account/ResetPassword'),
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
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import CheckAuth from '@/middleware/CheckAuth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(CheckAuth)

export default router

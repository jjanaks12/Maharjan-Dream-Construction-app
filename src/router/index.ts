import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import CheckAuth from '@/middleware/CheckAuth'
import { App, URLOpenListenerEvent } from '@capacitor/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
  const slug = event.url.split('.app').pop()

  if (slug)
    router.push({
      name: slug
    })
})

router.beforeEach(CheckAuth)

export default router

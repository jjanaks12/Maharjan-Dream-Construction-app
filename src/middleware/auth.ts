import { Route, NavigationGuardNext } from 'vue-router'
import Store from '@/store'

export default (to: Route, from: Route, next: NavigationGuardNext) => {
  const isLoggedIn = Store.getters['root/isLoggedIn']
  const toType = to.meta?.type

  if (isLoggedIn) {
    next()
    return
  }

  next({ name: 'login' })
}

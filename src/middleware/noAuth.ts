import { Route, NavigationGuardNext } from 'vue-router'
import Store from '@/store'

export default (to: Route, from: Route, next: NavigationGuardNext) => {
  const isLoggedIn = Store.getters['root/isLoggedIn']

  if (isLoggedIn) {
    next({ name: 'home' })
    return
  }

  next()
  return
}

import { Route, NavigationGuardNext } from 'vue-router'
import Store from '@/store'

export default (to: Route, from: Route, next: NavigationGuardNext) => {
  const token = Store.getters['root/getToken']

  if (token && token !== 'null') {
    next('/')
  }

  next()
}

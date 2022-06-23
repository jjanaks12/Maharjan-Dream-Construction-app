import { NavigationGuardNext, Route } from 'vue-router'

import store from '@/store'

export default (to: Route, from: Route, next: NavigationGuardNext) => {
  const type = to?.meta?.type
  const isLoggedIn = store.getters['root/isLoggedIn']

  switch (type) {
    case 'authorized':
      // auth(to, from, next)
      if (isLoggedIn) {
        next()
        break
      }

      next({ name: 'login' })
      break
    case 'unauthorized':
      // noAuth(to, from, next)

      next()
      break
    default:
      next()
  }
}

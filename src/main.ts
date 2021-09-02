import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

// plugins
import '@/plugins/validator'
import '@/plugins/directive/click-outside'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

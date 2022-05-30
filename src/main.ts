import Vue from 'vue'

import App from '@/App'
import router from '@/router'
import store from '@/store'

// Enviroment variable loading
import('dotenv/config')

// plugins
import '@/plugins/validator'
import '@/plugins/directive/click-outside'
import '@/plugins/pluginCheck'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

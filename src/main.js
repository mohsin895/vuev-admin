import Vue from 'vue'
import App from './App.vue'
// import router
import router from '@/router'
// import state manager
import store from '@/store'
// import API configuration
import axios from '@/axios'
window.axios = axios;
// import css normalization
import 'normalize.css'
// import all plugins
import '@/plugins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import moment from 'moment'

Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
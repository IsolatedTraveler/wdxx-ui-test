import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wd from '@'

Vue.use(wd)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

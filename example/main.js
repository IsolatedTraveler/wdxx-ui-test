import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wd from '@/index.js'
Vue.use(wd)
// import { wdSelect } from '@/index.js'
// Vue.use(wdSelect)
window.app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

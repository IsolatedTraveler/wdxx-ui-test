import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wd from '@/index.js'
import wd1 from '@p/'
import wd2 from '../index'
console.log(wd1, wd2)
if (location.search === '?cs') {
  Vue.use(wd1)
} else if (location.search === '?zs') {
  Vue.use(wd2)
} else {
  Vue.use(wd)
}
// import { wdSelect } from '@/index.js'
// Vue.use(wdSelect)
window.app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

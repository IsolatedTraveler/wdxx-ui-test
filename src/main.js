/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
// import Icon from 'vue-svg-icon/Icon.vue'
// Vue.component('icon', Icon)
// 引入全局数据定义组件
import store from './store'
// 引入数据修饰处理函数
import util from '@/assets/js/util'
Vue.prototype.util = util
// 手机适配
let judgeMobile = util.mobileFitter(320)
require('@/assets/css/page.scss')
if (judgeMobile) {
  require('@/assets/css/mobile.scss')
} else {
  require('@/assets/css/pc.scss')
}
// 引入自定义组件
import wd from '@/base/index'
import '@/base/libs/index.scss'
Vue.use(wd)

// 引入数据交互处理公共方法
import api from './api'
Vue.prototype.query = api.query
Vue.prototype.commit = api.commit
Vue.prototype.api = api.other
Vue.prototype.$judgeMobile = !judgeMobile
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

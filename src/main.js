/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入自定义组件
import wd from '@/base/src/index'
import '@/base/src/css/index.scss'
Vue.use(wd)

// 引入数据交互处理公共方法
import api from './fetch'
Vue.prototype.api = api
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

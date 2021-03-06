import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: { name: 'listView' }
  }, {
    path: '/listView',
    name: 'listView',
    component: r => require(['@v/listView.vue'], r)
  }, {
    path: '/selectView',
    name: 'selectView',
    component: r => require(['@v/selectView.vue'], r)
  }
]
export default new VueRouter({
  routes,
  linkActiveClass: 'wd-selected'
})

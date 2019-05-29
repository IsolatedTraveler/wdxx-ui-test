import Vue from 'vue'
import Router from 'vue-router'
import routes from './default'
import store from '@/store'
Vue.use(Router)
const router = new Router({
  routes: routes
})
router.beforeEach((to, from, next) => {
  let back = store.getters.back
  if (back && typeof back === 'function') {
    back()
    next(false)
  } else {
    if (to.name !== 'login' && !store.getters.userInfo) {
      next()
      // router.push({
      //   name: 'login'
      // })
    } else {
      next()
    }
  }
})
export default router

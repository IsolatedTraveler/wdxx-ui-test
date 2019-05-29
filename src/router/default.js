import login from '@/view/login'
import notFound from '@/view/notFound'
import test from './test'
export default [
  {
    path: '',
    redirect: '/login-exit'
  }, {
    path: '/login-exit',
    name: 'login',
    component: login
  }, {
    path: '/home-exit',
    name: 'home',
    component: login
  }, {
    path: '*',
    component: notFound
  },
  ...test
]

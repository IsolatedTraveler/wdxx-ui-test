import index from '@/view/index'
import address from '@/view/form/select/address'
export default [
  {
    path: '',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
    component: index
  }, {
    path: '/address',
    name: 'address',
    component: address
  }, {
    path: '*',
    redirect: '/index'
  }
]

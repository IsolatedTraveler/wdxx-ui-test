import index from '@/view/index'
export default [
  {
    path: '',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
    component: index
  }, {
    path: '*',
    redirect: '/index'
  }
]

export default [
  {
    path: '',
    redirect: '/overview'
  }, {
    path: '/overview',
    name: 'overview',
    component: () => import('@/view/overview')
  }, {
    path: '/quickstart',
    name: 'quickstart',
    component: () => import('@/view/quickstart')
  }, {
    path: '/list',
    name: 'list',
    component: () => import('@/view/data/list')
  }, {
    path: '/input',
    name: 'input',
    component: () => import('@/view/form/input')
  }
]

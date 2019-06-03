import input from '@/components/input'
import button from '@/components/button'
import progress from '@/components/progress'
import wdswitch from '@/components/switch'
import select from '@/components/select'
import tree from '@/components/tree'
export default [
  {
    path: '/input',
    name: 'input',
    component: input
  }, {
    path: '/button',
    name: 'button',
    component: button
  }, {
    path: '/progress',
    name: 'progress',
    component: progress
  }, {
    path: '/switch',
    name: 'switch',
    component: wdswitch
  }, {
    path: '/select',
    name: 'select',
    component: select
  }, {
    path: '/tree',
    name: 'tree',
    component: tree
  }
]

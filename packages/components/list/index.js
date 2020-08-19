import list from './list'
import listItem from './listItem'
import base from '@m/list.js'
listItem.mixins = [base]
list.mixins = [base, { components: { listItem } }]
list.install = Vue => Vue.component(list.name, list)
export default [list]

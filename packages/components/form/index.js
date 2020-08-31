import input from './input.vue'
import select from './select.vue'
import base from '@m/form.js'
import wdPop from '@pc/pop/pop.vue'
import wdList from '@pc/list/index'
input.mixins = [base]
select.mixins = [base, { components: { wdPop, wdList: wdList[0] } }]
input.install = Vue => Vue.component(input.name, input)
select.install = Vue => {
  Vue.component(select.name, select)
}
export default [
  input,
  select
]

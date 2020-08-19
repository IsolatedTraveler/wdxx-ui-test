import input from './input.vue'
import select from './select.vue'
input.install = Vue => Vue.component(input.name, input)
select.install = Vue => Vue.component(select.name, select)
export default [
  input,
  select
]

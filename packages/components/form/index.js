const input = require('./input.vue').default,
  select = require('./select.vue').default,
  form = require('./form.vue').default,
  base = require('@m/form.js').default,
  wdPop = require('@pc/pop/pop.vue').default,
  wdList = require('@pc/list/index').list
input.mixins = [base]
select.mixins = [base, { components: { wdPop, wdList: wdList } }]
input.install = Vue => Vue.component(input.name, input)
form.install = Vue => Vue.component(form.name, input)
select.install = Vue => {
  Vue.component(select.name, select)
}
module.exports = {
  input,
  select,
  form
}

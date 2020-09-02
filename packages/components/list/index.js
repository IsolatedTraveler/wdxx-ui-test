const list = require('./list').default,
  listItem = require('./listItem').default,
  base = require('@m/list.js').default
listItem.mixins = [base]
list.mixins = [base, { components: { listItem } }]
list.install = Vue => Vue.component(list.name, list)
module.exports = {
  list
}

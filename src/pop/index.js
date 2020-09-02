const pop = require('./pop.vue').default
pop.install = Vue => Vue.component(pop.name, pop)
module.exports = {
  pop
}

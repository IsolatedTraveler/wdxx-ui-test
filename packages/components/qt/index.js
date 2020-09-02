const icon = require('./icon.vue').default,
  yzm = require('./yzm.vue').default
icon.install = Vue => Vue.component(icon.name, icon)
yzm.install = Vue => Vue.component(yzm.name, icon)
module.exports = {
  icon,
  yzm
}

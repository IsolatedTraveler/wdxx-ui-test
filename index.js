const wd = require('./lib/wd.umd.min'),
  icon = require('./icon.vue').default,
  install = function(Vue, opts = {}) {
    Vue.component(icon.name, icon)
    wd.install(Vue, opts)
  }
icon.install = Vue => Vue.component(icon.name, icon)
module.exports.default = module.exports = {
  ...wd,
  icon,
  install
}
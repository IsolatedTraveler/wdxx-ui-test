require('@s/index.scss')
require('@u/pop.js')
const util = require('@u/index.js'),
  list = require('@c/list/index.js').default,
  pop = require('@c/pop/index.js').default,
  form = require('@c/form/index.js').default,
  components = [
    ...list,
    ...pop,
    ...form
  ],
  def = Object.fromEntries(components.map(item => [item.name, item])),
  install = function(Vue, opts = {}) {
    // 注册组件
    components.forEach(it => {
      Vue.component(it.name, it)
    })
    // 注册props
    Vue.prototype.$util = util
  }
// 自动注册组件，通过script引入的时候生效
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
def.install = install
module.exports.default = module.exports = def

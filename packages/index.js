require('@s/index.scss')
const util = require('@u/index.js'),
  components = {
    ...require('@pc/list/index.js'),
    ...require('@pc/pop/index.js'),
    ...require('@pc/form/index.js'),
    ...require('@pc/qt/index.js')
  },
  install = function(Vue, opts = {}) {
    // 注册组件
    Object.values(components).forEach(it => {
      Vue.component(it.name, it)
    })
    // 注册props
    Vue.prototype.$util = util
  }
// 自动注册组件，通过script引入的时候生效
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
module.exports.default = module.exports = {
  ...components,
  install
}

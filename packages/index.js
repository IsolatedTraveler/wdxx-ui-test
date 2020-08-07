import list from '@c/list/'
import '@s/index.scss'
const components = [
    ...list
  ], install = function(Vue, opts = {}) {
    if (install.installed) return
    // 注册组件
    components.forEach(it => {
      Vue.component(it.name, it)
    })
    // 自动注册组件，通过script引入的时候生效
    if (typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
  }
export default {
  ...components,
  install
}

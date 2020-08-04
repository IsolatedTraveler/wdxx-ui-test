const components = {
  }, install = function(Vue, opts = {}) {
    // 注册组件
    components.forEach(it => {
      Vue.component(it.name, it)
    })
  }
export default {
  ...components,
  install
}

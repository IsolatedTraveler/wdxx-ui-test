import icon from './icon.vue'
import yzm from './yzm.vue'
icon.install = Vue => Vue.component(icon.name, icon)
yzm.install = Vue => Vue.component(yzm.name, icon)
export default [
  icon,
  yzm
]

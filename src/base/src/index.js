import {components, props} from '../components/main.js'
import util from './util'
let obj = {
  install(vue, config) {
    config = {}
    components.forEach(item => {
      vue.component(item.name, item)
    })
    props.forEach(item => {
      vue.prototype[item.propsName] = item
      obj[item.componentName] = item
    })
    vue.prototype.$util = util
  }
}
export default obj

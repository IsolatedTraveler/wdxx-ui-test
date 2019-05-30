import {components, props} from '../components/main.js'
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
  }
}
export default obj

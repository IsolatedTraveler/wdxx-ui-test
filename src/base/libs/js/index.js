import main from '../components/main'
let obj = {
  install(vue) {
    main.components.forEach(item => {
      vue.component(item.name, item)
    })
    main.props.forEach(item => {
      vue.prototype[item.propsName] = item
      obj[item.componentName] = item
    })
  }
}
export default obj


import Vue from 'vue'
import msgVue from './msg'
var MsgBox = Vue.extend(msgVue), instance = null,
  showNextMsg = () => {
    if (!instance) {
      instance = new MsgBox({
        el: document.createElement('div')
      })
      document.body.appendChild(instance.$el)
    }
  },
  setOption = (option, options) => {
    var defaults = {
      button: null,
      title: '',
      delary: 0,
      type: 'modal',
      shadeClose: false,
      content: false
    }
    if (typeof option === 'string') {
      option = {
        message: option
      }
    }
    return Object.assign(defaults, options || {}, option)
  },
  msg = (option, judge) => {
    judge || (option = setOption(option))
    showNextMsg()
    return new Promise((resolve, reject) => {
      option.resolve = resolve
      option.reject = reject
      for (let prop in option) {
        instance[prop] = option[prop]
      }
      instance.show()
    })
  }
msg.alert = (option) => {
  option = setOption(option, {title: '警告', button: ['确认']})
  return msg(option, true)
}
msg.confirm = (option) => {
  option = setOption(option, {title: '警告', button: ['确认', '取消']})
  return msg(option, true)
}
msg.toast = (option) => {
  option = setOption(option, {delary: 1500, type: 'toast'})
  return msg(option, true)
}
msg.prompt = (option) => {
  if (typeof option === 'string') {
    option = {
      title: option
    }
  }
  option = setOption(option, {title: option, button: ['确认', '取消'], content: true})
  return msg(option, true)
}
msg.propsName = '$msg'
msg.componentName = 'Msg'
export default msg

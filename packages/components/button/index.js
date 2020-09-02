const button = require('./button.vue').default
button.install = Vue => Vue.component(button.name, button)
module.exports = {
  button
}

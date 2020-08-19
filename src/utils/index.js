require('./pop.js')
const util = {
  /**
  * @description 生成唯一标识符
  * @author 何波
  * @date 2020-07-30 10:39:16
  * @param {}
  */
  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  /**
  * @description 防抖动
  * @author 何波
  * @date 2019-07-26 15:58:00
  * @param {Function} fun
  * @param {Number} delay
  */
  debounce(fun, delay = 500) {
    if (fun) {
      let time = null
      return function() {
        const args = arguments
        clearTimeout(time)
        time = setTimeout(() => {
          fun.apply(this, args)
        }, delay)
      }
    } else {
      console.warn('防抖动函数缺少必要参数')
    }
  }
}
module.exports = util

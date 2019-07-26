export default {
  /**
  * @description 数字格式话显示保留n位小数
  * @author 何波
  * @date 2019-07-26 11:47:12
  * @param {Number} val  待格式化的数字
  * @param {Number} n    保留小数位数
  */
  numberFormat(val, n) {
    val = (val + '').split('.')
    return val[0] + '.' + ((val[1] || '') + '000000').substr(0, n)
  },
  /**
  * @description 防抖动
  * @author 何波
  * @date 2019-07-26 15:58:00
  * @param {Function} fun
  * @param {Number} delay
  */
  debounce(fun, delay) {
    let time = null
    return function() {
      let args = arguments
      clearTimeout(time)
      time = setTimeout(() => {
        fun.apply(this, args)
      }, delay)
    }
  }
}

window.Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export default {
  /**
  * @description 数字格式话显示保留n位小数
  * @author 何波
  * @date 2019-07-26 11:47:12
  * @param {Number} val  待格式化的数字
  * @param {Number} n    保留小数位数
  */
  numberFormat(val, n) {
    val = ((val || 0) + '').split('.')
    return val[0] + '.' + ((val[1] || '') + '000000').substr(0, n || 2)
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
  },
  /**
  * @description 页面适应屏幕（屏幕自适应）
  * @author 何波
  * @date 2019-08-05 14:34:30
  * @param {Number} width  最佳访问屏幕宽度
  * @param {Number} type   适配方法
  */
  filterScreen(width, type) {
    if (type) {

    } else {
      var body = document.documentElement, screenWidth = body.clientWidth, initialScale = screenWidth / width
      document.getElementsByTagName('meta').viewport.content = 'width=' + width + ', minimum-scale=' + initialScale + ', maximum-scale=' + initialScale + ', user-scalable=no'
    }
  },
  /**
  * @description 浏览器类型识别
  * @author 何波
  * @date 2019-08-06 16:31:14
  */
  browserType() {
    let ua = navigator.userAgent.toLowerCase()
    if (/MicroMessenger/i.test(ua)) {
      // 微信中打开
      return 'weixin'
    } else if (/Alipay/i.test(ua)) {
      // 支付宝中打开
      return 'alipay'
    } else {
      let u = navigator.userAgent
      if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return 'ios'
      } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        return 'android'
      }
    }
  },
  /**
  * @description 获取URL参数
  * @author 何波
  * @date 2019-08-06 17:52:51
  */
  getUrlParams() {
    var url = decodeURI((location.href + location.search).split('?').slice(1).join('&')), params = {}, datas = url.split('&')
    for (let i = 0; i < datas.length; i++) {
      let tempData = datas[i].split('=')
      params[tempData[0]] = tempData[1]
    }
    return params
  },
  /**
  * @description 关闭浏览器
  * @author 何波
  * @date 2019-08-29 17:48:41
  */
  exit() {
    if (window.AlipayJSBridge) {
      window.AlipayJSBridge.call('closeWebview')
      window.AlipayJSBridge.call('exitApp')
      window.AlipayJSBridge.call('popWindow', {data: {}})
    } else if (window.WeixinJSBridge) {
      window.WeixinJSBridge.call('closeWindow')
    } else {
      window.close()
    }
  },
  /**
  * @description 通过身份证号获取用户基本信息
  * @author 何波
  * @date 2019-09-05 10:31:56
  * @param {String} sfzh
  */
  getInfoByIDCard(sfzh) {
    let birth = '', sex = '', now = new Date(), csrq = null, y = 0
    if (sfzh.length === 15) {
      birth = '19' + sfzh.slice(6, 12)
      sex = sfzh.slice(-1)
    } else if (sfzh.length === 18) {
      birth = sfzh.slice(6, 14)
      sex = sfzh.slice(-2, -1)
    }
    birth = birth.replace(/(.{4})(.{2})/, '$1-$2-')
    sex = sex % 2 ? '男' : '女'
    csrq = new Date(birth)
    y = now.getFullYear() - csrq.getFullYear()
    return {birth, sex, age: y, nl: y + '岁'}
  },
  /**
  * @description 设置页面标题
  * @author 何波
  * @date 2019-09-05 15:01:06
  * @param {String} title
  */
  setPageTitle(title) {
    // document.title = title
  }
}

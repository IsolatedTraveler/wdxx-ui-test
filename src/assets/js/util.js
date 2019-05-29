var mobileFitter = (fitterWidth, maximumScale) => {
  let body = document.documentElement, width = body.clientWidth, initialScale = width / fitterWidth, userScalable = 'no'
  body.style.height = body.clientHeight / initialScale + 'px'
  body.style.width = fitterWidth + 'px'
  if (maximumScale > 1) {
    userScalable = 'yes'
  } else {
    maximumScale = 1
  }
  document.getElementsByTagName('meta').viewport.content = 'width=device-width, initial-scale=' + initialScale + ', maximum-scale=' + (maximumScale * initialScale) + ', user-scalable=' + userScalable
}
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
  mobileFitter(fitterWidth, maximumScale) {
    let judge = false
    if (this.getOsType() !== 2) {
      judge = true
      window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', mobileFitter(fitterWidth, maximumScale), false)
    }
    return judge
  },
  getOsType() {
    if (/(Android)/i.test(navigator.userAgent)) {
      return 0
    } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return 1
    } else {
      return 2
    }
  },
  debounce(fn, delay) {
    let timer = null
    return function() {
      let that = this, args = arguments
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(that, args)
      }, delay)
    }
  },
  getUrlParams() {
    let data = {}, search = window.location.search
    search && search.match(/[^?&]+/g).forEach(item => {
      let arr = item.split('=')
      data[arr[0]] = arr[1]
    })
    return data
  },
  sendMessage(url, otherWindow) {
    return function() {
      let params = [...arguments], arr = ['Util', 'exeParent']
      if (params[0]) {
        otherWindow.postMessage(JSON.stringify(params), url)
      } else {
        this.error('require', arr)
      }
    }
  },
  watchMessage(next) {
    window.addEventListener('message', next, false)
  },
  error(name, arr) {
    let str = '', msg = {
      require: '缺少必要的参数',
      objParams: '对象中该参数不存在'
    }
    arr.forEach(item => {
      str += '[' + item + '] '
    })
    str += msg[name]
    console.error(new Error(str))
  }
}

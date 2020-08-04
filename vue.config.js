Date.prototype.format = function(fmt) {
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
const dev = process.env.NODE_ENV === 'development', a = new Date().format('yyyy-MM-dd')
module.exports = {
  // publicPath: '解决打包后部分静态资源获取失败',
  publicPath: './',
  // outputDir: '打包后文件的目录',
  outputDir: `D://version/wd_gzh1/${a}`,
  // assetsDir: 'outputDir中的文件归纳到一个指定文件中',
  assetsDir: '',
  // indexPath: '打包后index.html所在的目录以及文件名',
  indexPath: `D://version/wd_gzh1/${a}/index.html`,
  productionSourceMap: dev,
  chainWebpack(config) {
    config.entry('app').clear().add('./example/main.js')
  },
  devServer: {
    proxy: {
      '/server1.json': {
        target: 'http://mobile.wonderscd.com/APK/ydgw',
        changeOrigin: true,
        ws: true
      },
      '/kf/rest/': {
        target: 'http://172.16.110.40:8080/testapi',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/kf': '/'
        }
      }
    }
  }
}

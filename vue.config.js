const dev = process.env.NODE_ENV === 'development', path = require('path')
module.exports = {
  // publicPath: '解决打包后部分静态资源获取失败',
  publicPath: './',
  // outputDir: '打包后文件的目录',
  outputDir: 'dist',
  productionSourceMap: dev,
  chainWebpack(config) {
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
      .set('@c', path.join(__dirname, './src/components'))
      .set('@m', path.join(__dirname, './packages/mixins'))
      .set('@s', path.join(__dirname, './src/style'))
      .set('@u', path.join(__dirname, './src/utils'))
      .set('@v', path.join(__dirname, './example/view'))
      .set('@p', path.join(__dirname, './packages'))
      .set('@pc', path.join(__dirname, './packages/components'))
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
  },
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}

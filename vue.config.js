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
      .set('@s', path.join(__dirname, './packages/style'))
      .set('@u', path.join(__dirname, './packages/utils'))
      .set('@v', path.join(__dirname, './example/view'))
      .set('@p', path.join(__dirname, './packages'))
      .set('@pc', path.join(__dirname, './packages/components'))
  },
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}

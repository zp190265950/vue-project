
const Timestamp = new Date().getTime();
const isPro = process.env.NODE_ENV === 'production'
const publicPath = isPro ? '//8.129.230.32/:8081/vue/' : `//192.168.0.69:9000/vue/`;

module.exports = {
  // publicPath: isPro ? '/vue/' : './', // 公共路径
  publicPath: '/vue/', // 公共路径
  productionSourceMap: false,
  outputDir: 'dist', // 输出文件名称
  assetsDir: 'static', // 输出静态文件放置的文件夹
  devServer: {
    port: 9000, // 本地启动的端口号
    headers: {
      'Access-Control-Allow-Origin': '*' // 微前端跨域处理
    }
  },
  configureWebpack: {
    output: { // 输出文件配置
      library: 'vue', // 输出后的文件名称
      libraryTarget: 'umd', // 这些选项将入口起点的返回值（例如，入口起点的任何导出值），在 bundle 包所引入的位置，赋值给 output.library 提供的变量名。
      filename: `static/js/[name].${process.env.VUE_APP_VERDION}.${Timestamp}.js`, // // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      chunkFilename: `static/js/[name].${process.env.VUE_APP_VERDION}.${Timestamp}.js`,
      globalObject: 'this'
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .options({})
      .end()
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({})
      .end()
  }
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 给js和css配置版本号
  //     config.output.filename('static/js/[name].' + Timestamp + '.js').end();
  //     config.output.chunkFilename('static/js/[name].' + Timestamp + '.js').end();
  //     config.plugin('extract-css').tap(args => [{
  //       filename: `static/css/[name].${Timestamp}.css`,
  //       chunkFilename: `static/css/[name].${Timestamp}.css`
  //     }])
  //   }
  // }
}

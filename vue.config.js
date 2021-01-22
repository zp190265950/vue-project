
const Timestamp = new Date().getTime();
const isPro = process.env.NODE_ENV === 'production'
const publicPath = isPro ? '//8.129.230.32/:8081/vue/' : `//192.168.0.36:9000/vue/`;
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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

  // chainWebpack: (config) => {
  //   config.module
  //     .rule('fonts')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .options({})
  //     .end()
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .options({})
  //     .end()
  // },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 给js和css配置版本号
      config.output.filename('static/js/[name].' + Timestamp + '.js').end();
      config.output.chunkFilename('static/js/[name].' + Timestamp + '.js').end();
      config.plugin('extract-css').tap(args => [{
        filename: `static/css/[name].${Timestamp}.css`,
        chunkFilename: `static/css/[name].${Timestamp}.css`
      }])
    }
    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            publicPath
          }
        }
      })
  },
  // configureWebpack: config => {
  //   config.plugins.push(
  //     new CompressionPlugin({
  //       algorithm: 'gzip', // 使用gzip压缩
  //       test: /\.js$|\.html$|\.css$/, // 匹配文件名
  //       filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
  //       minRatio: 1, // 压缩率小于1才会压缩
  //       threshold: 10240, // 对超过10k的数据压缩
  //       deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
  //     })
  //   )
  //   // if (process.env.NODE_ENV === 'production') {
  //   //   config.plugins.push(
  //   //     new BundleAnalyzerPlugin({
  //   //       analyzerPort: 8174
  //   //     })
  //   //   )
  // }
}

const UniReadPages = require('uni-read-pages')

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('fork-ts-checker')
    // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  configureWebpack: config => {
    const tfPages = new UniReadPages({
      includes: ['path', 'name', 'aliasPath', 'redirect', 'meta'],
    })
    config.plugins.push(
      new tfPages.webpack.DefinePlugin({
        ROUTES: JSON.stringify(tfPages.routes),
      }),
    )
    // config.plugins.push(
    //   new CircularDependencyPlugin({
    //     exclude: /node_modules/,
    //     failOnError: true,
    //     allowAsyncCycles: false,
    //     cwd: process.cwd(),
    //   }),
    // )
  },
}

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [],
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: './',
  devServer: {
    port: 8086,
    open: false,
    hot: true
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json']
    }
  }
})

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const {config} = require('shelljs')
config.plugins.push(
  new MonacoWebpackPlugin(
    {
      languages: ['go', 'python', 'javascript', 'java', 'css', 'html']
    }
  )
)
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }
}

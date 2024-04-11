const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const {config} = require('shelljs')
config.plugins.push(
  new MonacoWebpackPlugin(
    {
      languages: ['go', 'python', 'javascript', 'java', 'css', 'html']
    }
  )
)

// Import CSS files
import '../static/assets/css/font-awesome-4.7.0.min.css'
import '../static/assets/css/bootstrap-4.1.3.min.css'
import '../static/assets/css/style.css'

// Vue and Vue-related imports
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Markdown editor and related themes
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import Prism from 'prismjs'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import hljs from 'highlight.js'
import api from '../src/api/index'
Vue.prototype.$api = api

import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.config.productionTip = false
Vue.use(SlideVerify)
Vue.use(ElementUI)
Vue.use(hljs)
// 封装成一个指令,highlight是指令的名称
Vue.directive('highlight', el => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    // 创建ol标签元素
    let ol = document.createElement('ol')
    // 2.根据换行符获取行数，根据获取的行数生成行号
    let rowCount = block.outerHTML.split('\n').length
    for (let i = 1; i < rowCount; i++) {
      // 创建li标签元素
      let li = document.createElement('li')
      let text = document.createTextNode(i)
      // 将生成的行号添加到li标签中
      li.appendChild(text)
      // // 将li标签添加到ol标签中
      // ol.appendChild(li)
    }
    // 为ol标签添加class名
    ol.className = 'pre-numbering'
    block.parentNode.appendChild(ol)
    hljs.highlightBlock(block)
  })
})

// Vue components
import mdEditor from './component/MdEditor.vue'
import App from './App'

// Router and store
import router from './router'

// Use Vue plugins and configure Markdown editor
Vue.use(VueMarkdownEditor)
Vue.use(ElementUI)

VueMarkdownEditor.use(vuepressTheme, { Prism })
VueMarkdownEditor.use(githubTheme, { Hljs: hljs })

// Sync router with Vuex store

// Disable production tip
Vue.config.productionTip = false

// Instantiate Vue app
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    'MdEditor': mdEditor
  }
})

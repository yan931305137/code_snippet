import Vue from 'vue'
// 新添加1
import ElementUI from 'element-ui'
// 新添加2，避免后期打包样式不同，要放在import App from './App';之前
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'
sync(store, router)
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
VueMarkdownEditor.use(vuepressTheme, {
  Prism
})
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'
VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs
})
Vue.use(VueMarkdownEditor)
import mdEditor from './component/MdEditor.vue'
Vue.component('MdEditor', mdEditor)

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

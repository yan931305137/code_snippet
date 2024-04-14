// Import CSS files
import '../static/assets/css/font-awesome-4.7.0.min.css'
import '../static/assets/css/bootstrap-4.1.3.min.css'
import '../static/assets/css/style.css'

// Vue and Vue-related imports
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { sync } from 'vuex-router-sync'

// Markdown editor and related themes
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import Prism from 'prismjs'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import hljs from 'highlight.js'

// Vue components
import mdEditor from './component/MdEditor.vue'
import App from './App'

// Router and store
import router from './router'
import store from './store/index'

// Use Vue plugins and configure Markdown editor
Vue.use(VueMarkdownEditor)
Vue.use(ElementUI)

VueMarkdownEditor.use(vuepressTheme, { Prism })
VueMarkdownEditor.use(githubTheme, { Hljs: hljs })

// Sync router with Vuex store
sync(store, router)

// Disable production tip
Vue.config.productionTip = false

// Instantiate Vue app
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
    'MdEditor': mdEditor
  }
})

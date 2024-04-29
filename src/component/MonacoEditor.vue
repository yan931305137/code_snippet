<template>
  <div ref="monacoEditorRef" :style="style"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
import {debounce} from 'lodash'
import pythonSuggestion from './js/python-suggest.js'
import goSuggestion from './js/go-suggestion.js'
import {format} from 'sql-formatter'

const customLanguage = {
  'go': goSuggestion,
  'python': pythonSuggestion
}
export default {
  name: 'MonacoEditor',
  props: {
    width: {type: [String, Number], default: '100%'},
    height: {type: [String, Number], default: '100%'},
    code: {type: String, default: '// code \n'},
    language: {type: String, default: 'text'},
    theme: {type: String, default: 'vs-dark'}, // vs, hc-black
    options: {type: Object, default: () => ({})},
    highlighted: {
      type: Array,
      default: () => [
        {
          number: 0,
          class: ''
        }
      ]
    },
    requireConfig: {
      type: Object,
      default: () => {
        return {
          url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
          paths: {
            vs: 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min/vs'
          }
        }
      }
    },
    changeThrottle: {type: Number, default: 0},
    viewMode: {type: Boolean, default: false}
  },
  data () {
    return {
      editor: null,
      defaults: {
        fontSize: 16, // 字体大小
        autoIndent: true, // 自动布局 aviator
        lineNumbers: 'on',
        automaticLayout: true, // 自动布局
        SeverityLevel: 'warning',
        selectOnLineNumbers: true,
        roundedSelection: false,
        cursorStyle: 'line',
        glyphMargin: true,
        scrollBeyondLastLine: false
      }
    }
  },
  destroyed () {
    this.destroyMonaco()
  },
  mounted () {
    this.fetchEditor()
    this.initCustomLanguage()
  },
  computed: {
    style () {
      const {width, height} = this
      const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`
      const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`
      return {
        width: fixedWidth,
        height: fixedHeight
      }
    },
    editorOptions () {
      return Object.assign({}, this.defaults, this.options, {
        value: this.code,
        language: this.language,
        theme: this.theme,
        readOnly: this.viewMode
      })
    }
  },
  watch: {
    language () {
      monaco.editor.setModelLanguage(this.editor.getModel(), this.language)
    },
    codes: {
      handler (val) {
        this.editor.setValue(val)
      },
      deep: true
    }
  },
  methods: {
    initCustomLanguage () {
      let language = this.language
      if (!(Object.keys(customLanguage)).includes(this.language)) {
        return
      }
      monaco.languages.registerCompletionItemProvider(this.language, {
        provideCompletionItems: function () {
          let keywords = customLanguage[language]
          let suggestions = keywords.map(function (keyword) {
            return {
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: keyword
            }
          })
          return {suggestions: suggestions}
        }
      })
    },
    editorHasLoaded () {
      this.editor.onDidChangeModelContent(event => this.codeChangeHandler(this.editor, event))
      this.$emit('mountedEditor', this.editor)
    },
    codeChangeHandler () {
      if (this.codeChangeEmitter) {
        this.codeChangeEmitter(this.editor)
      } else {
        this.codeChangeEmitter = debounce(editor => {
          this.$emit('codeChange', editor)
        }, this.changeThrottle)
        this.codeChangeEmitter(this.editor)
      }
    },
    fetchEditor () {
      this.editor = monaco.editor.create(this.$refs.monacoEditorRef, this.editorOptions)
      this.editorHasLoaded(this.editor)

      /**
       * 添加右键格式化菜单
       */
        // 用于控制切换该菜单键的显示
      const shouldShowSqlRunnerAction = this.editor.createContextKey(
          'shouldShowSqlRunnerAction',
          false
        )
      // 前面已经定义了 editor
      // 添加 action
      this.editor.addAction({
        // id
        id: 'format',
        // 该菜单键显示文本
        label: 'Format',
        // 控制该菜单键显示
        precondition: 'shouldShowSqlRunnerAction',
        // 该菜单键位置
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        // 点击该菜单键后运行
        run: (event) => {
          // 格式化代码
          this.editor.setValue(format(this.editor.getValue()))
        }
      })
      // 显示
      shouldShowSqlRunnerAction.set(true)

      // 监测窗口变化
      window.addEventListener('resize', this.editor.layout())
    },
    destroyMonaco () {
      if (typeof this.editor !== 'undefined') {
        this.editor.dispose()
        // 监测窗口变化
        window.removeEventListener('resize', this.editor.layout(), true)
      }
    }
  }
}
</script>


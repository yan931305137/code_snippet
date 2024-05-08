<template>
  <el-container class="containers aiknow">
    <el-container class="mcontainer">
      <el-aside class="lcontainer">
        <el-select v-model="selectedModel" placeholder="请选择模型" @change="modelSelectionChanged">
          <el-option label="GPT-4" value="gpt-4"></el-option>
          <el-option label="GPT-3" value="gpt-3.5-turbo"></el-option>
        </el-select>
        <div v-show="this.showHistory" class="history">
          <div v-for="(message, index) in slideMessage" :key="index" readonly="true" @click="selectHistory(index)">
            <el-col :class="{ 'hovered': index === selectedHistoryIndex}" class="elcol" type="text"
                    @mouseenter="selectedHistoryIndex = index" @mouseleave="selectedHistoryIndex = -1"
            >
              {{ message.Content }}
            </el-col>
          </div>
        </div>
        <el-aside class="clear-button">
          <el-button @click="create">添加空白对话</el-button>
        </el-aside>
        <el-aside class="clear-button">
          <el-button @click="clear">清空全部对话记录</el-button>
        </el-aside>
      </el-aside>
      <el-main class="rcontainer">
        <div ref="messageContainer" class="message-container">
          <div v-for="(message, index) in messages" :key="index"
               :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }"
               class="message-item">
            <div class="imgheader">
              <div v-if="message.isUser" class="user">
                <el-avatar :src="favatar()" class="imgel">用户</el-avatar>
              </div>
              <div v-else class="ai">
                <el-avatar class="imgel" src="">AI</el-avatar>
              </div>
            </div>
            <el-card class="ecard">
              <p v-if="message.isTyping">{{ message.content }}</p>
              <div v-else-if="message.content" class="text-message" v-html="parseMarkdown(message.content)"></div>
              <p v-else-if="message.error" class="error-message">{{ message.content }}</p>
            </el-card>
            <div class="copy-container">
              <el-tag class="eltag" @click="copyText(message.content)">复制内容</el-tag>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <el-input
            ref="chatInput"
            v-model="userInput"
            :autosize="{ minRows: 3, maxRows: 3 }"
            class="message"
            placeholder="请输入内容"
            type="textarea"
          ></el-input>
          <el-button class="sbutton" type="primary" @click="sendMessage">发送</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import marked from 'marked'
import {Message, MessageBox} from 'element-ui'

let rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

export default {
  data () {
    return {
      showHistory: true,
      userInput: '',
      messages: [],
      historyMessages: [],
      slideMessage: [],
      selectedModel: 'gpt-3.5-turbo',
      selectId: '',
      selectedHistoryIndex: 0 // 默认选择第一个项
    }
  },
  mounted () {
    this.getMessage()
  },
  methods: {
    favatar () {
      return this.$parent.avatar
    },
    selectHistory (index) {
      try {
        this.messages = []
        this.selectedHistoryIndex = index
        // 将处理后的数据字符串解析为 JSON 格式
        const data = JSON.parse(`[` + this.historyMessages[this.selectedHistoryIndex].Content + `]`)
        // 提取 role 和 content
        data.map(item => {
          if (item.role === 'user') {
            this.messages.push({
              isTyping: null,
              isUser: true,
              content: item.content
            })
          } else {
            this.messages.push({
              isTyping: null,
              isUser: false,
              content: item.content
            })
          }
          this.$nextTick(this.scrollToBottom)
        })
      } catch (error) {
        Message.error(error)
      }
    },
    modelSelectionChanged (value) {
      this.selectedModel = value // 更新selectedModel为所选模型的值
    },
    async clear () {
      MessageBox.confirm('确定删除对话记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 执行删除对话记录
        this.messages = [] // 清空对话记录
        let res = await this.$api.DeleteAiKnowList()
        if (res.data.code === 0) {
          location.reload()
          Message.success(res.data.msg)
        } else {
          location.reload()
          Message.error(res.data.msg)
        }
      }).catch(() => {
        Message.info('取消删除对话记录')
      })
    },
    copyText (text) {
      navigator.clipboard.writeText(text).then(() => {
        // 成功复制文本到剪贴板的逻辑
        Message.success('文本已成功复制到剪贴板')
      }).catch(() => {
        // 复制失败的逻辑
        Message.error('复制文本到剪贴板失败')
      })
    },
    parseMarkdown (content) {
      return marked(content)
    },
    async getMessage () {
      try {
        let res = await this.$api.getAiKnow()
        if (res.data.code === 0) {
          this.historyMessages = res.data.data.map(item => ({Id: item.Id, Content: item.Content}))
          this.selectHistory(this.selectedHistoryIndex)
          this.$nextTick(this.scrollToBottom)
        } else {
          Message.error(res.data.msg)
        }
      } catch (error) {
        this.historyMessages = [{Id: -1, Content: '新对话'}]
      }
      for (let i = 0; i < this.historyMessages.length; i++) {
        const data = JSON.parse(`[` + this.historyMessages[i].Content + `]`)
        // 提取 role 和 content
        data.map(item => {
          if (item.role === 'user') {
            this.slideMessage[i] = {Content: item.content}
          }
        })
      }
    },
    async sendMessage () {
      var token = localStorage.getItem('token')
      if (this.userInput.trim() !== '') {
        if (token !== null) {
          this.messages.push({
            isTyping: null,
            isUser: true,
            content: this.userInput
          })
          let res = await this.$api.putAiKnow(this.userInput, this.historyMessages[this.selectedHistoryIndex].Id)
          if (res.data.data !== null) {
            this.messages.push({
              isTyping: null,
              isUser: false,
              content: res.data.data
            })
          } else {
            this.messages.push({
              isTyping: null,
              isUser: false,
              content: res.data.msg
            })
          }
          if (res.data.data !== null) {
            this.messages.push({
              isTyping: null,
              isUser: false,
              content: res.data.data
            })
          } else {
            this.messages.push({
              isTyping: null,
              isUser: false,
              content: res.data.msg
            })
          }
          if (this.historyMessages[this.selectedHistoryIndex].Id === -1) {
            location.reload()
          }
          this.$nextTick(this.scrollToBottom)
          // 清空输入框内容
          this.userInput = ''
          // 调整容器高度逻辑
          this.adjustContainerHeight()
        } else {
          Message.error('请登陆后再进行操作')
        }
      } else {
        Message.error('你没有输入内容哦!')
      }
    },
    adjustContainerHeight () {
    },
    scrollToBottom () {
      const messageContainer = this.$refs.messageContainer
      messageContainer.scrollTop = messageContainer.scrollHeight
    },
    create () {
      this.showHistory = false
      this.$nextTick(function () {
        this.slideMessage[this.slideMessage.length] = {Content: '空白对话'}
        this.historyMessages[this.slideMessage.length - 1] = {Id: -1, Content: ''}
        this.showHistory = true
      })
    }
  }
}
</script>

<style>
.aiknow {
  height: 705px;
  width: 1100px;
  border: 0.5px solid #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ecard {
  width: 710px;
  padding: 0 -10px;
}

.copy-container {
  margin-top: -20px; /* 调整到合适的位置 */
  margin-left: 680px; /* 调整到合适的位置 */
  cursor: pointer;
}

.imgel {
  height: 35px;
  width: 35px;
  line-height: 35px;
  font-size: 10px;
  margin: 0 10px 0 10px;
  float: left;
}

.mcontainer {
  width: 1100px;
  display: flex;
}

.lcontainer {
  border-right: 0.5px #dddddd solid;
  width: 30%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rcontainer {
  width: 70%;
}

.clear-button > * {
  display: inline-block;
  width: 85%;
}

.message-container {
  width: 100%;
  height: 580px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  position: absolute;
  transition: bottom 0.3s; /* 添加过渡效果 */
  margin-left: 40px;
  width: 640px;
  resize: none;
  overflow-y: auto;
}

.sbutton {
  width: 10%;
  height: 74px;
  float: right;
  margin-right: 40px;
  text-align: center;
  line-height: 47px;
  border-right: 0.5px #dddddd solid;
  flex-direction: column;
  justify-content: space-between;
}

.history {
  height: 550px;
  width: 280px;
  margin: -10px;
}

.elcol[type="text"] {
  padding: 5px;
  margin: 10px;
  width: 260px;
  height: 40px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 如果需要显示省略号 */
  cursor: pointer;
}

.elcol:hover,
.elcol.hovered {
  background: #eeeeee;
}
</style>

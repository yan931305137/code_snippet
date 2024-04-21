<template>
  <el-container class="containers aiknow">
    <el-container class="mcontainer">
      <el-aside class="lcontainer">
        <el-select v-model="selectedModel" placeholder="请选择模型" @change="modelSelectionChanged">
          <el-option label="GPT-4" value="gpt-4"></el-option>
          <el-option label="GPT-3" value="gpt-3.5-turbo"></el-option>
        </el-select>
        <div class="history">
          <div v-for="(message, index) in historyMessages" :key="index" readonly="true" @click="selectHistory(index)">
            <el-col class="elcol" type="text"  :class="{ 'hovered': index === selectedHistoryIndex}"
                    @mouseenter="selectedHistoryIndex = index" @mouseleave="selectedHistoryIndex = -1"
            >
              {{message.Content }}
            </el-col>
          </div>
        </div>
        <el-aside class="clear-button">
          <el-button @click="clear">清空对话记录</el-button>
        </el-aside>
      </el-aside>
      <el-main class="rcontainer">
        <div class="message-container" ref="messageContainer">
          <div v-for="(message, index) in messages" :key="index" class="message-item" :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
            <div class="imgheader">
              <div v-if="message.isUser" class="user">
                <el-avatar class="imgel" src=""> 用户</el-avatar>
              </div>
              <div v-else class="ai">
                  <el-avatar class="imgel" src="" >AI</el-avatar>
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
            type="textarea"
            class="message"
            placeholder="请输入内容"
            v-model="userInput"
            :autosize="{ minRows: 3, maxRows: 3 }"
            ref="chatInput"
          ></el-input>
          <el-button class="sbutton" @click="sendMessage(userInput)" type="primary">发送</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import marked from 'marked'
import {Message} from 'element-ui'
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
      userInput: '',
      messages: [],
      historyMessages: [],
      selectedModel: 'gpt-3.5-turbo',
      selectId: '',
      selectedHistoryIndex: 0 // 默认选择第一个项
    }
  },
  mounted () {
    this.getMessage()
  },
  methods: {
    selectHistory (index) {
      try {
        this.messages = []
        this.selectedHistoryIndex = index
        // 将处理后的数据字符串解析为 JSON 格式
        const data = JSON.parse(`[` + this.historyMessages[this.selectedHistoryIndex].Content + `]`)
        // 提取 role 和 content
        data.map(item => {
          console.log(item)
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
    clear () {
      this.messages = [] // 清空对话记录
      let res = this.$api.DeleteAiKnowList()
      if (res.data.code === 0) {
        location.reload()
        Message.success(res.data.msg)
      } else {
        location.reload()
        Message.error(res.data.msg)
      }
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
          // eslint-disable-next-line standard/object-curly-even-spacing
          this.historyMessages = res.data.data.map(item => ({Id: item.Id, Content: item.Content }))
          this.selectHistory(this.selectedHistoryIndex)
          this.$nextTick(this.scrollToBottom)
        } else {
        }
      } catch (error) {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.historyMessages = [{Id: -1, Content: '新对话' }]
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
          this.messages.push({
            isTyping: null,
            isUser: false,
            content: res.data.data
          })
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
.ecard{
  padding: 0;
}
.copy-container {
  margin-top: -20px; /* 调整到合适的位置 */
  margin-left: 680px; /* 调整到合适的位置 */
  cursor: pointer;
}

.imgel{
  height: 35px;
  width: 35px;
  line-height: 35px;
  font-size: 10px;
  margin-right: 10px;
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
.rcontainer{
  width: 70%;
}

.clear-button >*{
  display: inline-block;
  width: 85%;
}
.message-container{
  width: 100%;
  height: 580px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  position: absolute;
  transition: bottom 0.3s; /* 添加过渡效果 */
  width: 680px;
  resize: none;
  overflow-y: auto;
}

.sbutton{
  width: 10%;
  height: 74px;
  float: right;
  text-align: center;
  line-height: 47px;
  border-right: 0.5px #dddddd solid;
  flex-direction: column;
  justify-content: space-between;
}
.history{
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

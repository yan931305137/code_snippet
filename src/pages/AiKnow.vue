<template>
  <el-container class="containers aiknow">
    <el-tag class="mx-1" type="success">用户对话记录最多保存2000字的长度，超过长度将会重置</el-tag>
    <el-container class="mcontainer">
      <el-aside class="lcontainer">
        <el-select v-model="selectedModel" placeholder="请选择模型" @change="modelSelectionChanged">
          <el-option label="GPT-4" value="gpt-4"></el-option>
          <el-option label="GPT-3" value="gpt-3.5-turbo"></el-option>
        </el-select>
        <el-aside class="clear-button">
          <el-button @click="clear">清空对话记录</el-button>
        </el-aside>
      </el-aside>
      <el-main class="rcontainer">
        <div class="message-container" ref="messageContainer">
          <div v-for="(message, index) in messages" :key="index" class="message-item" :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
            <div class="imgheader">
              <div v-if="message.isUser" class="user">
                <el-avatar class="imgel" src="../assets/logo.png"> 用户</el-avatar>
              </div>
              <div v-else class="bot">
                <el-avatar class="imgel" src="../assets/logo.png" >AI</el-avatar>
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
      selectedModel: 'gpt-3.5-turbo'
    }
  },
  methods: {
    modelSelectionChanged (value) {
      this.selectedModel = value // 更新selectedModel为所选模型的值
    },
    clear () {
      this.messages = [] // 清空对话记录
    },
    copyText (text) {
      navigator.clipboard.writeText(text).then(() => {
        // 成功复制文本到剪贴板的逻辑
        this.$message.success('文本已成功复制到剪贴板')
      }).catch(() => {
        // 复制失败的逻辑
        this.$message.error('复制文本到剪贴板失败')
      })
    },
    parseMarkdown (content) {
      return marked(content)
    },
    sendMessage () {
      if (this.userInput !== '') {
        this.messages.push({
          isTyping: null,
          isUser: true,
          content: this.userInput
        })
        // 清空输入框内容
        this.userInput = ''
        // 调整容器高度逻辑
        this.adjustContainerHeight()
      }
    },
    adjustContainerHeight () {
    }
  },
  mounted () {
    // 初始化逻辑
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
  margin-left: 10px; /* 调整到合适的位置 */
}

.imgel{
  height: 40px;
  width: 40px;
}
.user{
  float: right;
}
.mx-1{
  height: 30px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 560px;
  overflow-y: auto;
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

</style>

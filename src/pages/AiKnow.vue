<template>
  <div class="common-layouts">
    <el-container class="common-el">
      <el-card class="box-card">
        <el-header class="model-selection" style="padding: 0">
          <div style="margin-left: 50vw">
          </div>
          <el-select v-model="selectedModel" placeholder="请选择模型" @change="modelSelectionChanged">
            <el-option label="GPT-4" value="gpt-4"></el-option>
            <el-option label="GPT-3" value="gpt-3.5-turbo"></el-option>
          </el-select>
          <div style="float: right">
            <el-tag class="mx-1" type="success"  style="text-align: right;">用户对话记录最多保存1200字的长度，超过长度将会重置</el-tag>
          </div>
        </el-header>
        <el-aside style="width: 220px;float: left">
          <el-button style="margin-top: 500px;width: 100% " @click="clear">清空对话记录</el-button>
        </el-aside>
        <!-- 消息容器 -->
        <div class="message-container" ref="messageContainer">
          <div v-for="(message, index) in messages" :key="index" class="message-item" :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
            <el-card>
              <template #header>
                <div v-if="message.isUser" class="card-header">
                  <el-avatar> user </el-avatar>
                  <div>
                    <el-avatar src="https://www.rhzhz.cn/wp-content/uploads/2023/11/20220714222919_c0aa1.thumb_.1000_0.jpg"
                    />
                  </div>
                </div>
                <div v-else class="card-header">
                  <div>
                    <el-avatar src="https://www.rhzhz.cn/wp-content/uploads/2022/08/Gravity_Falls_BillCipherCursor.png"
                    />
                  </div>
                  <el-avatar> robot </el-avatar>
                </div>
              </template>
              <p v-if="message.isTyping">{{ message.content }}</p>
              <div v-else-if="message.content" class="text-message" v-html="parseMarkdown(message.content)"></div>
              <p v-else-if="message.error" class="error-message">{{ message.content }}</p>
            </el-card>
            <el-button @click="copyText(message.content)">复制文本</el-button>
          </div>

        </div>
        <div class="chat-input">
          <el-input class="message" :disabled="robotIsReplying" v-model="userInput" type="textarea" autosize placeholder="请输入消息"></el-input>
          <i class="fa fa-reply-all sbutton"  @click="sendMessage" type="primary"></i>
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>

export default
{
  data () {
    return {
      userInput: '',
      messages: [],
      password: '',
      showPasswordCard: false,
      robotIsReplying: false, // 用于标识机器人是否正在回复
      selectedModel: 'gpt-3.5-turbo', // 默认选择 GPT-4
      textToCopy: '要复制的文本内容',
      // 在 data 中添加用于存储用户输入历史的变量
      chatHistory: []  // 用于存储对话历史
    }
  },
  methods: {
    // parseMarkdown (text) {
    //   return md.render(text)
    // },
    copyText (text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('文本已成功复制到剪贴板')
      }).catch((error) => {
        alert('文本复制失败：' + error)
      })
    },
    modelSelectionChanged () {
      if (this.selectedModel === 'gpt-4') {
        this.showPasswordCard = true // 当选择了GPT-4时显示密码输入卡片
      } else {
        this.showPasswordCard = false // 其他情况下隐藏密码输入卡片
      }
    },
    clear () {
      // eslint-disable-next-line no-sequences
      this.userInput = '',
        this.chatHistory = [], // 用于存储对话历
        this.messages = [],
        // 调用该函数以清除对话历史
        localStorage.removeItem('chatHistory')
      this.$notify({
        title: 'Success',
        message: '记录已经清空！',
        type: 'success'
      })
    },
    clears () {
      window.location.href = 'https://chatGpt.rhzhz.cn'
    },
    submitPassword () {
      if (this.password === 'useit') { // 替换为真实的密码
        this.$notify({
          title: 'Success',
          message: '权限已经获得！',
          type: 'success'
        })
        this.selectedModel = 'gpt-4'
        this.accessGranted = true // 设置权限状态为已获得
        this.showPasswordCard = false
        // this.password = ''; // 清空密码字段
      } else {
        this.$notify({
          title: '通知',
          message: '这是一条通知消息',
          type: 'success' // 消息类型，可选值包括 success、warning、info、error
        })
      }
      // this.selectedModel = 'gpt-4'
      this.selectedModel = 'gpt-3.5-turbo'
      // 密码错误处理
    },
    async sendMessage () {
      if (this.selectedModel === 'gpt-4' && !this.accessGranted) {
        // 弹出提示或其他处理，要求用户先验证密码
        this.$notify({
          title: 'Warning',
          message: '都是贫困惹的祸！',
          type: 'success'
        })
        return
      }
      console.log('当前模式' + this.selectedModel)
      this.robotIsReplying = true
      if (this.userInput === '') { this.robotIsReplying = false; return }
      // 特定字符拦截
      if (this.userInput === 'xxx' || this.userInput === 'xxx' || this.userInput === 'xxx') {
        this.robotIsReplying = false
        this.messages.push({ content: '特定信息!' })
        this.userInput = ''
        return
      }

      if (this.userInput.trim() === '') return

      this.messages.push({ content: this.userInput, isUser: true })

      try {
        this.messages.push({ content: '等待机器人回复...', isTyping: true }) // 显示正在输入状态
        // 将用户输入的消息添加到对话历史中
        this.chatHistory.push({
          sender: 'user',
          message: this.userInput
        })

        // 在发送消息时将整个对话历史发送给后台
        const historyString = JSON.stringify(this.chatHistory)
        // console.log("历史记录"+this.chatHistory)
        // console.log("机器人说0"+historyString)
        // 提取用户说的消息并拼接成字符串
        // 提取所有用户的消息
        // 假设 chatHistory 是包含完整对话历史的数组
        const maxHistoryLength = 4  // 指定要保留的最大条目数

        // 裁剪对话历史到最近的 3-4 条信息
        const trimmedChatHistory = this.chatHistory.slice(-maxHistoryLength)
        console.log('裁剪的信息' + trimmedChatHistory)
        // 现在 trimmedChatHistory 中包含了最近的 3-4 条对话历史记录
        const userMessages = trimmedChatHistory
          .filter(item => item.sender === 'user') // 过滤出 sender 为 'user' 的对话记录
          .map(item => item.message) // 通过 map 方法获取每条消息的内容
        // 处理后台返回的响应消息
        // 合并消息为字符串
        const userMessageString = userMessages.join(' ') // 使用 join 方法将消息拼接成一个字符串，用空格分隔每条消息
        // 在拼接的消息后面加上新的问题
        const fullUserMessage = userMessageString + ' 以上是我之前问你的问题，只供你回答我接下来问题做参考，请你不要重复回答我之前问过的问题，只对新问题进行处理。新问题是：' + this.userInput
        if (userMessageString.length >= 1200) {
          this.chatHistory = [] // 如果用户消息长度超过 1000 个字符，则清空聊天历史
          // 调用该函数以清除对话历史
          localStorage.removeItem('chatHistory')
        }
        // console.log("用户说"+userMessageString)
        console.log('对话内容' + fullUserMessage)
        console.log('机器人说1' + historyString)
        const response = await this.chatGPTRequest(fullUserMessage)

        // while(response.choices[0].message.content)console.log(response.choices[0].message.content)
        this.handleBackendResponse(response)
        console.log('机器人说2' + response)

        const content = response.choices[0].message.content

        console.log('机器人说3' + content)
        if (content) {
          for (let i = 0; i < content.length; i++) {
            // await this.delay(30); // 等待一段时间再添加下一个字
            this.messages = [...this.messages.slice(0, -1), { content: content.slice(0, i + 1), isUser: false }]
            await this.$nextTick(() => {
              const messageContainer = this.$refs.messageContainer
              // 滚动到消息容器的底部
              messageContainer.scrollTop = messageContainer.scrollHeight
            })
          }
          // 将用户输入添加到历史记录中，并清空当前输入

          console.log(response)
        } else {
          this.messages.push({ content: '未能解析回复', isUser: false })
        }
      } catch (error) {
        this.messages = [...this.messages.filter(msg => !msg.isTyping)] // 清除正在输入状态
        this.messages.push({ content: 'ChatGPT 发生错误', isUser: false, error: true }) // 添加错误消息
      }
      this.userInput = '' // 清空用户输入
      this.robotIsReplying = false
    },

    // 处理后台返回的响应消息
    handleBackendResponse (response) {
      // 将后台返回的消息添加到对话历史中
      this.chatHistory.push({
        sender: 'bot',
        message: response.message
      })

      // 更新本地显示的对话历史
      this.saveChatHistoryToLocalStorage()
    },

    // 将对话历史保存到本地存储
    saveChatHistoryToLocalStorage () {
      localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory))
    },

    // 从本地存储加载对话历史
    loadChatHistoryFromLocalStorage () {
      const storedChatHistory = localStorage.getItem('chatHistory')
      if (storedChatHistory) {
        this.chatHistory = JSON.parse(storedChatHistory)
      }
    },
    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    chatGPTRequest (msg) {
      // return new Promise((resolve, reject) => {
      // axios({
      //   method: 'post',
      //   url: 'https://api.openai.com/v1/chat/completions',
      //   data: {
      //     'max_tokens': 1200,
      //     'model': this.selectedModel,
      //     'temperature': 0.8,
      //     'top_p': 1,
      //     'presence_penalty': 1,
      //     'messages': [
      //       {
      //         'role': 'system',
      //         'content': 'You are ChatGPT'
      //       },
      //       {
      //         'role': 'user',
      //         'content': msg
      //       }
      //     ],
      //     'stream': false // 设置 stream 为 false
      //   },
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer 你的key'
      //   },
      //   onDownloadProgress: (progressEvent) => {
      //     // 数据流
      //   }
      //   })
      //     .then(response => {
      //       resolve(response.data)
      //     })
      //     .catch(error => reject(error))
      // })
    }
  },
  mounted () {
    // 在组件挂载时加载本地存储中的用户输入历史
    this.loadChatHistoryFromLocalStorage()
  }
}
</script>
<style>
.common-layouts {
  width: 1100px;
  margin: 20px auto;
}

.common-el{
  height: 700px;
}
.user-message, .bot-message {
  margin-bottom: 30px;
}

.user-message {
  /*margin-left: 50vw;*/
  /*background-color: #d4edda; !* 设置用户消息的背景色 *!*/
  text-align: right;
}

.bot-message {
  /*margin-right: 50vw;*/
  text-align: left;
}

.chat-input {
  /*position: absolute;*/
  display: flex;
  align-items: center;
  padding: 10px;
  height: 46px;
  margin: 500px 0 0 300px;
  border: #eeeeee;
  background-color: #ffffff;
}

.chat-input el-input {
  flex: 1;
  margin-right: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  margin:0 auto;
  width: 97vw;
  height: 700px; /* 注意这里添加了分号 */
  position: relative; /* 让卡片成为定位上下文 */
  overflow: auto; /* 如果需要滚动条的话 */
}

/* 添加打字效果的样式 */
.typing-indicator {
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 0;
}

.typing-indicator:before {
  display: block;
  content: "|"; /* 使用竖线作为光标 */
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  right: 0;
  animation: typing 0.5s steps(30, end) infinite; /* 使用 steps 函数来模拟逐字显示 */
}
@keyframes typing {
  from { width: 0; }
  to { width: auto; }
}

.error-message {
  color: red;
  font-style: italic;
}
.text-message {
  margin: 10px 0;

}
@keyframes typing {
  0% {
    height: 0;
  }
  50% {
    height: 1em;
  }
  100% {
    height: 0;
  }
}
/* 可以根据需求自定义样式 */
.chat-container {
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.message-container {
  overflow-y: auto; /* 设置内容超出时显示滚动条 */
  margin-left:  auto;
  float: right;
  /*float: right;*/
  width: 73vw;
  max-height: 70vh;
  padding: 10px;
}

.user-message {
  text-align: right;
  /*background-color: #d4edda; !* 设置用户消息的背景色 *!*/
}

.bot-message {
  text-align: left;
  /*background-color: #f0f0f0; !* 设置ChatGPT消息的背景色 *!*/
}

.input-container {
  position: absolute; /* 将输入框容器设置为绝对定位 */
  bottom: 0; /* 将输入框容器放置在底部 */
  width: 100%; /* 设置输入框容器的宽度为100% */
  padding: 10px; /* 添加内边距 */
  display: flex; /* 使用 Flex 布局 */
  justify-content: space-between; /* 调整输入框和发送按钮之间的间距 */
}
.message{
  line-height: 50px;
}
.sbutton{
  z-index: 1;
  height: 35px;
  width: 35px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  font-size: 25px;
  border-radius: 5px;
  margin-left: -38px;
  color: rgba(11, 11, 11, 0.47);
  background-color: rgba(221, 221, 221, 0.47);
}
</style>

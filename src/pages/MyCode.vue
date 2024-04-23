<template>
  <div class="containers">
    <div class="monaco-container">
      <span class="head">我的代码</span>
      <hr class="hr"/>
      <span>添加代码</span>
      <div class="select">
        <el-select v-model="value" clearable placeholder="纯文本" @change="categoryChange">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </div>
      <MonacoEditor class="monaco_editor" ref="MonacoEditor" @change="codeChange" :language="this.category" v-model="this.content" v-if="isShow"></MonacoEditor>
    </div>
    <div class="md-container">
      <el-collapse>
        <el-collapse-item title="更多设置" class="el-collapse-item">
          <div class="input-row">
            <el-input class="input-item" placeholder="最大40个字" v-model="title">
              <template slot="prepend">标题</template>
            </el-input>
            <el-input class="input-item" placeholder="支持自定义标签" v-model="tags">
              <template slot="prepend">标签</template>
            </el-input>
            <el-input class="input-item" placeholder="留空默认永久" v-model="expire_time">
              <template slot="prepend">过期时间</template>
            </el-input>
          </div>
          <MdEditor class="md_editor"  ref="childRef" v-model="this.description"></MdEditor>
        </el-collapse-item>
      </el-collapse>
      <div class="button">
        <el-button @click="authority(1)">公开</el-button>
        <el-button @click="authority(2)">私人</el-button>
        <el-button @click="authority(3)">加密</el-button>
        <el-button class="submit" @click="code_submit">提交</el-button>
      </div>
    </div>
    <el-row>
      <span>我的代码</span>
      <el-col :span="24" v-for="(card, index) in cards" :key="index">
        <el-card class="el-card" :body-style="{ padding: '0px' }">
          <MonacoEditor class="monaco_editor" v-model="card.content" :language="card.category"></MonacoEditor>
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <div class="card-description">{{card.description}}</div>
              <time class="time">{{ card.expire_time }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MonacoEditor from '../component/MonacoEditor.vue'
import MdEditor from '../component/MdEditor.vue'
import {Message} from 'element-ui'

export default {
  components: {
    MonacoEditor,
    MdEditor
  },
  mounted () {
    this.getMyCode()
  },
  data () {
    return {
      isShow: true,
      cards: [], // Array with length 2 for two cards
      authority: 1,
      category: '',
      content: '',
      title: '',
      tags: '',
      expire_time: '',
      description: '',
      code_password: '',
      options: [{
        value: '选项1',
        label: 'go'
      }, {
        value: '选项2',
        label: 'java'
      }, {
        value: '选项3',
        label: 'python'
      }, {
        value: '选项4',
        label: 'json'
      }, {
        value: '选项5',
        label: 'sql'
      }],
      value: ''
    }
  },
  methods: {
    async getMyCode () {
      try {
        let res = await this.$api.GetMyCode()
        if (res.data.code !== 0) {
          Message.error(res.data.msg)
        } else {
          for (let i = 0; i < res.data.data.length; i++) {
            this.cards.push({
              content: res.data.data[i].Content,
              category: res.data.data[i].Category,
              description: res.data.data[i].Description,
              title: res.data.data[i].Title,
              tags: res.data.data[i].Tags,
              expire_time: res.data.data[i].ExpireTime,
              authority: res.data.data[i].Authority,
              code_password: res.data.data[i].CodePassword
            })
          }
        }
      } catch (err) {
        Message.error(err)
      }
    },
    codeChange (content) {
      this.content = ''
      this.content = content
    },
    categoryChange (value) {
      this.category = value
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    },
    async code_submit () {
      if (this.content.length !== 0) {
        let res = await this.$api.PostCode(
          this.content,
          this.category,
          this.description = this.$refs.childRef.$data.editorValue,
          this.title,
          this.tags,
          this.expire_time,
          this.authority,
          this.code_password
        )
        if (res.data.code === 0) {
          location.reload()
          Message.success(res.data.msg)
        } else {
          Message.error(res.data.msg)
        }
      } else {
        Message.error('代码片段不能为空哦!')
      }
    }
  }
}
</script>

<style>
.containers {
  width: 1100px;
  margin: 70px auto;
  display: flex;
  flex-direction: column;
}

.hr {
  margin: 30px 0;
}

.monaco-container,
.md-container {
  margin-bottom: 30px;
  flex: 1;
}

.monaco-container {
}

.monaco_editor {
  clear: both;
  margin-top: 20px;
}

.md-container {
}

.select{
  float: right;
  margin-left: auto;
  display: flex;
  align-items: center;
}

.input-row {
  display: flex;
  padding: 0;
  margin: 0;
}

.input-item {
  flex: 1;
  padding: 10px;
}

.input-item:last-child {
  margin-right: 0;
}

.button {
  margin-top: 10px;
}

.submit {
  float: right;
  width: 150px;
}

.el-collapse-item {
  width: 100%;
}

.md_editor {
  height: 100%;
  width: 100%;
}

.el-card {
  padding: 10px;
  margin: 10px 10px 20px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.card-description{
  line-height: 20px;
  height:20px;
  width: 1000px; /* 设置固定宽度 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
</style>

<template>
  <div class="containers">
    <div class="monaco-container">
      <span class="head">我的代码</span>
      <hr class="hr"/>
      <span>代码片段</span>
      <div class="select">
        <el-select v-model="value" clearable placeholder="纯文本">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <MonacoEditor class="monaco_editor" @change="codeChange" v-model="code" language="go"></MonacoEditor>
    </div>
    <div class="md-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="更多设置" class="el-collapse-item">
          <div class="input-row">
            <el-input class="input-item" placeholder="最大40个字" v-model="input1">
              <template slot="prepend">标题</template>
            </el-input>
            <el-input class="input-item" placeholder="支持自定义标签" v-model="input2">
              <template slot="prepend">标签</template>
            </el-input>
            <el-input class="input-item" placeholder="留空默认永久" v-model="input3">
              <template slot="prepend">过期时间</template>
            </el-input>
          </div>
          <MdEditor class="md_editor"></MdEditor>
        </el-collapse-item>
      </el-collapse>
      <div class="button">
        <el-button>公开</el-button>
        <el-button>加密</el-button>
        <el-button>私人</el-button>
        <el-button class="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '../component/MonacoEditor.vue'
import MdEditor from '../component/MdEditor.vue'

export default {
  components: {
    MonacoEditor,
    MdEditor
  },
  data () {
    return {
      code: 'type user struct',
      input1: '',
      input2: '',
      input3: '',
      options: [{
        value: '选项1',
        label: 'GO'
      }, {
        value: '选项2',
        label: 'Java'
      }, {
        value: '选项3',
        label: 'Python'
      }, {
        value: '选项4',
        label: 'Json'
      }, {
        value: '选项5',
        label: 'Sql'
      }],
      value: ''
    }
  },
  methods: {
    codeChange (e) {
      console.log(e)
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
</style>

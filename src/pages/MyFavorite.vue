<template>
  <div class="containers">
    <div class="container-handle">
      <span class="head">我的收藏</span>
      <div class="select">
        <el-select v-model="value" class="el-select" clearable placeholder="纯文本" @change="changeValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="input1" class="el-input1" placeholder="请输入关键词搜索">
          <template slot="append">搜索</template>
        </el-input>
      </div>
    </div>
    <hr class="hr hr2"/>
    <el-row v-if="isShow">
      <el-col v-for="(card, index) in this.cards" :key="index" :span="8" style="display: inline-block">
        <el-card class="topCard">
          <div>
            <div class="topH5">{{ card.title }}</div>
            <MonacoEditor
              ref="MonacoCode"
              :change-throttle="500"
              :code="card.content"
              :language="card.category"
              :options="{fontSize:12 , lineNumbers:'off'}"
              :viewMode="true"
              class="monaco_codes mycode"
              height="400px"
              width="100%"
            />
            <div class="topDescription">{{ card.description }}</div>
            <div>
              <div class="topFoot inlineTop">
                <div>
                  <el-tag class="topCategory"><a href="/">{{ card.category }}</a></el-tag>
                </div>
                <div class="inlineTop">
                  <span aria-label="eye" role="img"><svg aria-hidden="true" data-icon="eye" fill="currentColor"
                                                         focusable="false" height="1em" viewBox="64 64 896 896"
                                                         width="1em"><path
                    d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg></span>
                  <div>{{ card.look }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-else class="n">
      <i class="fa fa-th-large fa-5x"></i>
      <div class="ncontent">暂无相关内容</div>
      <el-button :class="{ active: isRouteActive('/codes') }" class="nbutton">
        <router-link to="/codes">添加代码片段</router-link>
      </el-button>
    </div>
  </div>
</template>

<script>

import MonacoEditor from '../component/MonacoEditor.vue'
import {Message} from 'element-ui'

export default {
  components: {
    MonacoEditor
  },
  data () {
    return {
      isShow: false,
      mdShow: true,
      cards: [],
      options: [{
        value: 'go',
        label: 'GO'
      }, {
        value: 'java',
        label: 'Java'
      }, {
        value: 'python',
        label: 'Python'
      }, {
        value: 'json',
        label: 'Json'
      }, {
        value: 'sql',
        label: 'Sql'
      }],
      value: '',
      input1: ''
    }
  },
  mounted () {
    this.GetMyfavorite()
  },
  methods: {
    changeValue (value) {
      if (value !== '') {
        this.mdShow = false
        this.$nextTick(() => {
          const codeStorage = JSON.parse(localStorage.getItem('favoriteCodes'))
          this.cards = []
          for (let i = 0; i < codeStorage.length; i++) {
            if (codeStorage[i].category === value) {
              this.cards.push({
                content: codeStorage[i].content,
                category: codeStorage[i].category,
                description: codeStorage[i].description,
                title: codeStorage[i].title,
                tags: codeStorage[i].tags,
                expire_time: codeStorage[i].expire_time,
                authority: codeStorage[i].authority,
                code_password: codeStorage[i].code_password,
                link: codeStorage[i].link,
                collect: codeStorage[i].collect
              })
            }
          }
          this.mdShow = true
          this.isShow = this.cards.length !== 0
        })
      } else {
        this.GetMyfavorite()
      }
    },
    async GetMyfavorite () {
      try {
        if (localStorage.getItem('token') !== null) {
          let res = await this.$api.GetMyfavorite()
          if (res.data.code !== 0) {
            Message.error(res.data.msg)
          } else if (res.data.code === 0 && res.data.data !== null) {
            this.isShow = true
            const codes = []
            this.cards = []
            for (let i = 0; i < res.data.data.length; i++) {
              codes[i] = {
                content: res.data.data[i].Content,
                category: res.data.data[i].Category,
                description: res.data.data[i].Description,
                title: res.data.data[i].Title,
                tags: res.data.data[i].Tags,
                expire_time: res.data.data[i].ExpireTime,
                authority: res.data.data[i].Authority,
                code_password: res.data.data[i].CodePassword,
                like: res.data.data[i].Like,
                collect: res.data.data[i].Collect
              }
              this.cards.push(codes[i])
              localStorage.setItem('favoriteCodes', JSON.stringify(codes))
            }
          }
        }
      } catch (err) {
        Message.error(err)
      }
    },
    isRouteActive (route) {
      return this.$route.path === route
    },
    codeChange (e) {
      console.log(e)
    }
  }
}
</script>

<style>

.container-handle {
  display: flex;
  align-items: center;
}

.el-input1 {
  margin-left: 20px;
}

.hr2 {
  margin: 15px 0;
}

.container-handle {
  display: flex;
  align-items: center;
}

.head {
  color: #333333;
  font-size: 20px;
  margin-bottom: 16px;
}

.el-input1 {
  margin-left: 20px;
}

.hr2 {
  margin: 15px 0;
}

.n {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 10px auto;
}

.ncontent {
  width: 100px;
  margin: 0 auto;
}

</style>

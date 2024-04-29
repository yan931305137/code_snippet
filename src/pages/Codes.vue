<template>
  <div class="containers">
    <div class="search-input">
      <el-input v-model="searchInput" placeholder="请输入关键词搜索">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="search-container">
      <div class="search-directory">
        <h4>编程语言</h4>
        <hr/>
        <ul class="search-ul">
          <el-checkbox-group v-model="checkList" @change="toSelection">
            <el-checkbox v-for="(language, index) in languages" :key="index" :label="language.value"
                         class="checkbox-li">{{ language.name }}:({{ getCount(language.value) }})
            </el-checkbox>
          </el-checkbox-group>
        </ul>
      </div>
      <el-row>
        <el-col v-for="(card, index) in cards" :key="index" :span="24">
          <el-card :body-style="{ padding: '0px' }" class="el-card my-code-card">
            <MonacoEditor
              v-if="mdshow"
              ref="MonacoCode"
              :change-throttle="500"
              :code="card.content"
              :language="card.category"
              :viewMode="true"
              class="monaco_codes mecodes"
              height="400px"
              width="100%"
            />
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <div class="card-descriptions">{{ card.description }}</div>
                <time class="time">{{ card.expire_time }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      :total="1000"
      background
      class="pagination"
      layout="prev, pager, next">
    </el-pagination>
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
      mdshow: true,
      searchInput: '',
      cards: [],
      searchTerm: '',
      text_count: 0,
      go_count: 0,
      java_count: 0,
      python_count: 0,
      json_count: 0,
      sql_count: 0,
      languages: [
        {name: 'Text', value: 'text', count: this.text_count, selected: false},
        {name: 'Go', value: 'go', count: this.go_count, selected: false},
        {name: 'Java', value: 'java', count: this.java_count, selected: false},
        {name: 'Python', value: 'python', count: this.python_count, selected: false},
        {name: 'JSON', value: 'json', count: this.json_count, selected: false},
        {name: 'SQL', value: 'sql', count: this.sql_count, selected: false}
      ],
      languageCount: [
        0, 0, 0, 0, 0, 0],
      checkList: []
    }
  },
  mounted () {
    this.getCodes()
  },
  methods: {
    getCount (language) {
      if (language === 'text') {
        return this.languageCount[0]
      } else if (language === 'go') {
        return this.languageCount[1]
      } else if (language === 'java') {
        return this.languageCount[2]
      } else if (language === 'python') {
        return this.languageCount[3]
      } else if (language === 'json') {
        return this.languageCount[4]
      } else if (language === 'sql') {
        return this.languageCount[5]
      }
      return 0
    },
    async search () {
      try {
        if (this.searchInput.trim() !== '') {
          let res = await this.$api.SearchGetCodes(this.searchInput)
          if (res.data.code !== 0) {
            Message.error(res.data.msg)
          } else if (res.data.code === 0) {
            this.cards = []
            const codes = []
            this.languageCount = [0, 0, 0, 0, 0, 0]
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].Category === 'text') {
                this.languageCount[0]++
              } else if (res.data.data[i].Category === 'go') {
                this.languageCount[1]++
              } else if (res.data.data[i].Category === 'java') {
                this.languageCount[2]++
              } else if (res.data.data[i].Category === 'python') {
                this.languageCount[3]++
              } else if (res.data.data[i].Category === 'json') {
                this.languageCount[4]++
              } else if (res.data.data[i].Category === 'sql') {
                this.languageCount[5]++
              }
              codes[i] = {
                content: res.data.data[i].Content,
                category: res.data.data[i].Category,
                description: res.data.data[i].Description,
                title: res.data.data[i].Title,
                tags: res.data.data[i].Tags,
                expire_time: res.data.data[i].ExpireTime,
                authority: res.data.data[i].Authority,
                code_password: res.data.data[i].CodePassword
              }
              this.cards.push(codes[i])
              if (this.checkList.length !== 0) {
                this.filterCards()
              }
            }
            localStorage.setItem('codes', JSON.stringify(codes))
          }
        } else {
          await this.getCodes()
        }
      } catch (err) {
        Message.error(err)
      }
    },
    async getCodes () {
      try {
        let res = await this.$api.GetCodes()
        if (res.data.code !== 0) {
          Message.error(res.data.msg)
        } else if (res.data.code === 0 && res.data.data !== null) {
          this.cards = []
          const codes = []
          this.languageCount = [0, 0, 0, 0, 0, 0]
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].Category === 'text') {
              this.languageCount[0]++
            } else if (res.data.data[i].Category === 'go') {
              this.languageCount[1]++
            } else if (res.data.data[i].Category === 'java') {
              this.languageCount[2]++
            } else if (res.data.data[i].Category === 'python') {
              this.languageCount[3]++
            } else if (res.data.data[i].Category === 'json') {
              this.languageCount[4]++
            } else if (res.data.data[i].Category === 'sql') {
              this.languageCount[5]++
            }
            codes[i] = {
              content: res.data.data[i].Content,
              category: res.data.data[i].Category,
              description: res.data.data[i].Description,
              title: res.data.data[i].Title,
              tags: res.data.data[i].Tags,
              expire_time: res.data.data[i].ExpireTime,
              authority: res.data.data[i].Authority,
              code_password: res.data.data[i].CodePassword
            }
            this.cards.push(codes[i])
            if (this.checkList.length !== 0) {
              this.filterCards()
            }
          }
          localStorage.setItem('codes', JSON.stringify(codes))
        }
      } catch (err) {
        Message.error(err)
      }
    },
    toSelection () {
      this.mdshow = false
      this.$nextTick(() => {
        if (this.checkList.length !== 0) {
          this.filterCards()
        } else {
          this.getCodes()
        }
        this.mdshow = true
      })
    },
    filterCards () {
      const codeStorage = JSON.parse(localStorage.getItem('codes'))
      this.cards = []
      for (let i = 0; i < codeStorage.length; i++) {
        for (let j = 0; j < this.checkList.length; j++) {
          if (codeStorage[i].category === this.checkList[j]) {
            this.cards.push({
              content: codeStorage[i].content,
              category: codeStorage[i].category,
              description: codeStorage[i].description,
              title: codeStorage[i].title,
              tags: codeStorage[i].tags,
              expire_time: codeStorage[i].expire_time,
              authority: codeStorage[i].authority,
              code_password: codeStorage[i].code_password
            })
          }
        }
      }
    }
  }
}
</script>

<style>
.search-input {
  margin-top: 15px;
  width: 100%;
}

.search-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.search-directory {
  width: 20%;
  margin-top: 15px;
  padding: 20px;
  height: 650px;
}

.card-descriptions {
  width: 820px !important;
  line-height: 20px;
  height: 20px;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.search-directory {
  border: #dddddd 0.5px solid;
  margin-left: 10px;
}

.search-ul {
  height: 570px;
  overflow-y: auto;
}

.checkbox-li {
  width: 100%;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px dashed #dddddd;
  margin-bottom: 10px;
}

.checkbox-li:hover {
  background-color: #dddddd;
}

.pagination {
  display: block;
  margin: 20px 0 0 690px;
}
</style>

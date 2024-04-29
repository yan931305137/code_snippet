<template>
  <el-row>
    <el-col v-for="(card, index) in cards" :key="index" :span="8" style="display: inline-block">
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
              <button v-show="isShow" class="topButton" type="button" @click="like(card.id)">
                <div class="inlineTop">
                    <span aria-label="like" role="img"><svg aria-hidden="true" data-icon="like" fill="currentColor"
                                                            focusable="false" height="1em" viewBox="64 64 896 896"
                                                            width="1em"><path
                      d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path></svg></span>
                  <div>{{ card.like }}</div>
                </div>
              </button>
              <button v-show="isShow" class="topButton" type="button" @click="collect(card.id)">
                <div class="inlineTop">
                    <span aria-label="star" role="img"><svg aria-hidden="true" data-icon="star" fill="currentColor"
                                                            focusable="false" height="1em" viewBox="64 64 896 896"
                                                            width="1em"><path
                      d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path></svg></span>
                  <div>{{ card.collect }}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {Message} from 'element-ui'
import MonacoEditor from './MonacoEditor.vue'

export default {
  data () {
    return {
      isShow: true,
      cards: [],
      currentDate: new Date()
    }
  },
  props: {
    top: {type: Number, default: 0}
  },
  mounted () {
    this.getTop()
  },
  components: {MonacoEditor},
  methods: {
    async like (codeId) {
      let res = await this.$api.PostLike(codeId)
      if (res.data.code !== 401) {
        if (res.data.code !== 0) {
          Message.error(res.data.msg)
        } else if (res.data.code === 0) {
          this.isShow = false
          this.cards = []
          await this.getTop()
          this.$nextTick(function () {
            this.isShow = true
          })
          Message.success(res.data.msg)
        }
      }
    },
    async collect (codeId) {
      let res = await this.$api.PostCollect(codeId)
      if (res.data.code !== 401) {
        if (res.data.code !== 0) {
          Message.error(res.data.msg)
        } else if (res.data.code === 0) {
          this.isShow = false
          this.cards = []
          await this.getTop()
          this.$nextTick(function () {
            this.isShow = true
          })
          Message.success(res.data.msg)
        }
      }
    },
    async getTop () {
      let res = await this.$api.GetTopHot(this.top)
      if (res.data.code !== 0) {
        Message.error(res.data.msg)
      } else if (res.data.code === 0 && res.data.data !== null) {
        for (let i = 0; i < res.data.data.length; i++) {
          this.cards.push({
            id: res.data.data[i].CodeID,
            content: res.data.data[i].Content,
            category: res.data.data[i].Category,
            description: res.data.data[i].Description,
            title: res.data.data[i].Title,
            tags: res.data.data[i].Tags,
            expire_time: res.data.data[i].ExpireTime,
            authority: res.data.data[i].Authority,
            look: res.data.data[i].Look,
            like: res.data.data[i].Like,
            collect: res.data.data[i].Collect,
            code_password: res.data.data[i].CodePassword
          })
        }
      }
    }
  }
}
</script>

<style>
.topH5 {
  font-size: 20px;
  margin: -15px 0;
  color: #000000;
  font-weight: bold;
}

.topDescription {
  height: 30px;
  font-size: 14px;
  color: #999999;
}

.topCategory {
  height: 20px;
  line-height: 16px;
  font-size: 12px;
  border-radius: 10px;
}

.inlineTop > * {
  display: inline-block;
}

.topFoot {
  float: right;
}

.topFoot > * {
  margin-left: 10px;
}

.topButton {
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-radius: 10px;
  padding: 0 10px;
}

.topButton:hover {
  background-color: rgba(204, 204, 204, 0.5);
}

.el-card__body, .el-main {
  padding: 10px 0;
}
</style>

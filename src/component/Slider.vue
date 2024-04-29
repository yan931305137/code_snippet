<template>
  <div>
    <slider ref="slider" :options="option" style="width: 1120px; margin: 10px auto; height: 500px">
      <slideritem v-for="(card, index) in cards" v-if="dataNotNull" :key="index" class="slide-item">
        <i class="slideButton el-icon-arrow-left" style="margin-right:-80px" @click="slidePre"></i>
        <el-card class="el-card my-code-cards ">
          <MonacoEditor
            ref="MonacoCode"
            :change-throttle="500"
            :code="card.content"
            :language="card.category"
            :viewMode="true"
            class="mecodes"
            height="100%"
            width="100%"
          />
          <div>
            <div class="bottom clearfixs">
              <div class="card-descriptions">{{ card.description }}</div>
              <time class="time">{{ card.expire_time }}</time>
            </div>
          </div>
        </el-card>
        <i class="slideButton el-icon-arrow-right" style="margin-left: -80px" @click="slideNext"></i>
      </slideritem>
      <div v-else slot="loading" class="loading">loading...</div>
    </slider>
  </div>
</template>

<script>
import {slider, slideritem} from 'vue-concise-slider'
import MonacoEditor from '../component/MonacoEditor.vue'
import {Message} from 'element-ui'

export default {
  mounted () {
    this.getMyCode()
  },
  data () {
    return {
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: true,
        cursorStyle: 'line',
        automaticLayout: false
      },
      dataNotNull: true,
      cards: [],
      option: {
        currentPage: 0, // 当前页码
        thresholdDistance: 500, // 滑动判定距离
        thresholdTime: 4000, // 滑动判定时间
        autoplay: 5000, // 自动滚动[ms]
        loop: true, // 循环滚动
        direction: 'horizontal', // 方向设置，垂直滚动
        loopedSlides: 1, // 无限滚动前后遍历数
        slidesToScroll: 1// 每次滑动项数
      }
    }
  },
  components: {
    MonacoEditor,
    slider,
    slideritem
  },
  methods: {
    slideNext () {
      this.$refs.slider.$emit('slideNext')
    },
    slidePre () {
      this.$refs.slider.$emit('slidePre')
    },
    async getMyCode () {
      try {
        let res = await this.$api.GetTopSlider()
        if (res.data.data === null) {
          this.dataNotNull = false
        }
        if (res.data.code !== 0) {
          Message.error(res.data.msg)
        } else if (res.data.code === 0 && res.data.data !== null) {
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
    }
  }
}
</script>

<style>
.mecodes {
  height: 400px !important;
}

.slide-item > * {
  text-align: left;
}

.card-descriptions {
  font-size: 15px;
}

.clearfixs {
  height: 20px !important;
}

.my-code-cards {
  height: 500px; /* 设置足够高的高度 */
  overflow-y: auto; /* 显示垂直滚动条 */
  width: 1100px !important;
}

.slider-pagination-bullet-active {
  background-color: #eeeeee !important;
}

.slideButton {
  color: rgba(238, 238, 238, 0.5);
  background-color: rgba(238, 238, 238, 0.3);
  border: none;
  z-index: 4;
  display: flex;
  float: right;
  height: 40px;
  width: 40px;
  top: 230px;
}
</style>

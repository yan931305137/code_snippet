<template>
  <div>
    <slider ref="slider" class="sliders" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
      <slideritem  class="slide-item"  v-for="(card, index) in cards" :key="index" >
        <el-card class="el-card my-code-cards ">
          <MonacoEditor class="mecodes" ref="MonacoCode" v-model="card.content" :readOnly=true :language="card.category"></MonacoEditor>
          <div style="padding: 14px;">
            <div class="bottom clearfixs">
              <div class="card-descriptions">{{card.description}}</div>
              <time class="time">{{ card.expire_time }}</time>
            </div>
          </div>
        </el-card>
      </slideritem>
      <!-- Customizable loading -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'
import MonacoEditor from '../component/MonacoEditor.vue'
import {Message} from 'element-ui'
export default {
  mounted () {
    this.getMyCode()
  },
  data () {
    return {
      cards: [],
      options: {
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
    async getMyCode () {
      try {
        let res = await this.$api.GetTopSlider()
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
.mecodes{
  height: 400px !important;
}
.slide-item>*{
  text-align: left;
}
.card-descriptions{
  font-size: 15px;
}
.clearfixs{
  height: 20px!important;
}
.my-code-cards{
  width: 1100px !important;
}

</style>

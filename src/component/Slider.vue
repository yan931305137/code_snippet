<template>
  <!-- Make a div wrapped slider,set height and width -->
  <div style="width:100%;margin:20px auto;height:400px">
    <!-- Using the slider component -->
    <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
      <!-- slideritem wrapped package with the components you need -->
      <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
      <!-- Customizable loading -->
      <div slot="loading">loading...</div>
    </slider>
  </div>
</template>
<script>
// import slider components
import { slider, slideritem } from 'vue-concise-slider'
export default {
  el: '#app',
  data () {
    return {
      // data list [array]
      someList: [
        {
          html: 'slider1',
          style: {
            'background': '#4abf8a'
          }
        },
        {
          html: 'slider2',
          style: {
            'background': '#4bbfc3'
          }
        },
        {
          html: 'slider3',
          style: {
            'background': '#7baabe'
          }
        }
      ],
      // Slider configuration [obj]
      options: {
        currentPage: 0, // 当前页码
        thresholdDistance: 500, // 滑动判定距离
        thresholdTime: 1000, // 滑动判定时间
        autoplay: 3000, // 自动滚动[ms]
        loop: true, // 循环滚动
        direction: 'horizontal', // 方向设置，垂直滚动
        loopedSlides: 1, // 无限滚动前后遍历数
        slidesToScroll: 1// 每次滑动项数
      }
    }
  },
  components: {
    slider,
    slideritem
  }
}
</script>

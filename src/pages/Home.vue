<template>
  <div class="containers codes">
    <div class="slider">
      <Slider></Slider>
    </div>
    <div class="top-container">
      <el-collapse accordion>
        <el-collapse-item class="top" title="最热排行">
          <div style="width: 100%;height: 25px"><a href="/codes#/codes" style="float: right">更多 ></a></div>
          <HotTop :top="1"></HotTop>
        </el-collapse-item>
        <el-collapse-item class="top" title="最新排行">
          <div style="width: 100%;height: 25px"><a href="/codes#/codes" style="float: right">更多 ></a></div>
          <HotTop :top="2"></HotTop>
        </el-collapse-item>
        <el-collapse-item class="top" title="关注排行">
          <div style="width: 100%;height: 25px"><a href="/codes#/codes" style="float: right">更多 ></a></div>
          <HotTop :top="3"></HotTop>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import HotTop from '../component/HotTop'
import Slider from '../component/Slider'

export default {
  components: {
    HotTop,
    Slider
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
.slider {
  cursor: pointer;
  z-index: 0;
}

.top {
  border-top: 0.5px solid #eeeeee;
  padding: 10px 0;
  width: 100%;
}

.top:nth-child(1) {
  margin-top: 10px;
}

.top-container {
  width: 1100px;
}

.top {
  margin-left: 10px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none !important;
}

.el-collapse-item .el-collapse-item__header:hover {
  background-color: #eeeeee;
}

.el-collapse {
  border: none;
}

.el-collapse-item__header {
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
}

.monaco-editor .view-lines {
  cursor: pointer !important;
}
</style>

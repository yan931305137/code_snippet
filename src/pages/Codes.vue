<template>
  <div class="containers codes">
    <div class="top-container">
      <div class="hottop top">
        <h4>热门排行</h4>
        <HotTop></HotTop>
      </div>
      <div class="newtop top">
        <h4>最新排行</h4>
        <HotTop></HotTop>
      </div>
      <div class="focustop top">
        <h4>关注排行</h4>
        <HotTop></HotTop>
      </div>
    </div>
  </div>
</template>

<script>
import HotTop from '../component/HotTop.vue'

export default {
  components: {
    HotTop
  },
  data () {
    return { }
  },
  methods: {
  }
}
</script>

<style>
.top-container {
  display: flex;
  justify-content: space-between; /* Distribute items evenly */
}
.top > h4{
  margin-left: 10px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 10px;
}
.newtop{
  margin: 0 10px;
}
.top-container > .top{
  border: #cccccc 0.5px solid;
}
</style>

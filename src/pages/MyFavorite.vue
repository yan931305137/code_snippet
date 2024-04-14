<template>
    <div class="containers">
      <div class="container-handle">
        <span class="head">我的收藏</span>
        <div class="select">
          <el-select v-model="value" clearable placeholder="纯文本" class="el-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入关键词搜索" v-model="input1" class="el-input1">
            <template slot="append">搜索</template>
          </el-input>
        </div>
      </div>
      <hr class="hr hr2"/>
      <div class="n">
        <svg t="1712846344051" class="nicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1944" width="200" height="200"><path d="M864.64 636.288l5.226667 3.029333 79.253333 45.952 2.773333 1.749334a38.613333 38.613333 0 0 1-2.517333 65.216L525.013333 997.248a38.613333 38.613333 0 0 1-39.04 0.213333L58.24 750.549333l-7.744-8.106666-0.768-0.938667-1.92-3.050667a38.570667 38.570667 0 0 1 14.186667-52.629333l79.637333-45.994667 5.226667-3.008 5.226666 3.008 56.213334 32.469334 15.658666 9.045333-0.213333 0.128 110.869333 65.856 13.525334 8.042667c63.146667 37.482667 126.357333 75.029333 138.432 82.154666l1.493333 0.874667 0.554667 0.32c9.664 4.437333 23.381333 5.098667 34.176-1.024L825.6 657.706667l0.896 0.554666 32.896-18.986666 5.248-3.008z m-0.341333-206.954667l5.226666 3.029334 79.594667 46.144 2.773333 1.749333a38.613333 38.613333 0 0 1-2.517333 65.237333L524.992 790.485333a38.613333 38.613333 0 0 1-39.04 0.213334L58.346667 543.850667l-7.616-7.850667-0.981334-1.237333-1.962666-3.072a38.592 38.592 0 0 1 14.208-52.629334l79.957333-46.165333 5.226667-3.029333 5.226666 3.029333 56.234667 32.448 15.658667 9.045333-1.322667 0.768 18.474667 10.88 95.829333 56.32 13.653333 8.021334c68.202667 40.064 132.650667 77.909333 133.632 78.4 12.416 6.357333 33.066667 5.077333 43.52 0 0.832-0.384 3.306667-1.792 7.189334-4.053334l4.352-2.517333c20.8-12.16 66.453333-39.274667 115.584-68.586667l11.072-6.613333 20.586666-12.266667 101.12-60.416-0.810666-0.448 15.637333-9.024 27.904-16.128 0.213333-0.128 28.16-16.213333 5.205334-3.029333zM506.922667 21.333333c6.762667 0 13.44 1.792 19.328 5.205334l422.741333 245.141333a38.634667 38.634667 0 0 1 0.384 67.050667L525.013333 583.722667a38.613333 38.613333 0 0 1-39.04 0.234666L58.154667 336.981333l-9.578667-5.546666 1.770667-2.688-0.64-0.810667-1.941334-3.029333a38.592 38.592 0 0 1 14.208-52.629334L485.632 27.733333c6.314667-4.16 13.696-6.378667 21.290667-6.378666z" fill="#cdcdcd" p-id="1945"></path></svg>
        <div class="ncontent">暂无相关内容</div>
        <el-button class="nbutton" :class="{ active: isRouteActive('/codes') }"><router-link to="/codes">添加代码片段</router-link></el-button>
      </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
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
      value: '',
      input1: ''
    }
  },
  methods: {
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

.span2{
  margin-bottom: 16px;
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

.ncontent,
.nicon {
  width: 100px;
  margin: 0 auto;
}

</style>

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
        <i class="fa fa-th-large fa-5x"></i>
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

.ncontent {
  width: 100px;
  margin: 0 auto;
}

</style>

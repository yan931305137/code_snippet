<template>
  <el-row>
    <el-col :span="24" v-for="(card, index) in cards" :key="index">
      <el-card class="el-card" :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" alt="">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date(),
      cards: Array.from({ length: 10 }) // Array with length 2 for two cards
    }
  }
}
</script>

<style>
.el-card {
  margin: 10px;
  padding: 10px;
  margin-bottom: 20px; /* Add margin bottom to create space between cards */
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

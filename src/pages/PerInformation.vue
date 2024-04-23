<template>
  <div class="containers">
    <span class="head">个人信息</span>
    <hr class="hr"/>
    <div class="extra">
      <el-button type="primary" class="form-button" size="small">修改</el-button>
    </div>
    <el-descriptions class="margin-top col-lg-2" :column="1" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          头像
        </template>
        <div class="block"><el-avatar shape="square" :size="50" class="avatar-img" :src="this.$parent.avatar"></el-avatar></div>
      </el-descriptions-item>
    </el-descriptions>
  <el-descriptions class="margin-top col-lg-12" style="margin-top: 20px" :column="3" size="medium" border>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      {{ this.$parent.username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{ this.$parent.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        性别
      </template>
      {{ this.$parent.gender }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        邮箱
      </template>
      {{ this.$parent.email }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        出生日期
      </template>
      {{ this.$parent.birthday }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      {{ this.$parent.place }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      {{ this.$parent.address }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        状态
      </template>
      <el-tag size="small">{{ this.$parent.status }}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
.avatar-img{
  margin: 5px -11px -1px 11px;
}
.extra{
  width: 1100px;
}
.form-button{
  width: 50px;
  float: right;
}
</style>

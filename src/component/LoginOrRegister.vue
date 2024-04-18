<template>
  <div class="login-register-dialog" v-if="showDialog">
    <el-form :class="{ 'show-login-form': showLoginForm }">
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <h2 class="lrh2" v-if="showLoginForm">登录</h2>
            <h2 class="lrh2" v-else>注册</h2>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <el-input type="text" :id="showLoginForm ? 'username' : 'newUsername'" v-model="username" placeholder="账号"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <el-input type="password" :id="showLoginForm ? 'password' : 'newPassword'" v-model="password" placeholder="密码"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <el-button class="login-register-btn" @click="showLoginForm ? login() : register()" type="primary">{{ showLoginForm ? '登录' : '注册' }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <p>{{ showLoginForm ? '你有账号吗?' : '你已经有账号了吗?' }} <a href="#" @click.prevent="toggleMode" class="toggle-link">{{ showLoginForm ? '注册' : '登录' }}</a></p>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {Message} from 'element-ui'

export default {
  name: 'LoginOrRegister',
  props: ['showDialog', 'mode'], // 接受模式属性
  data () {
    return {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      showLoginForm: true
    }
  },
  watch: {
    // 监听模式属性的变化，并根据模式切换表单
    mode: function (newMode) {
      if (newMode === 'register') {
        this.showLoginForm = false
      } else {
        this.showLoginForm = true
      }
    }
  },
  methods: {
    async login () {
      try {
        let res = await this.$api.login(this.username, this.password)
        if (res.data.resultCode === 200) {
          const token = 'token'
          Message.success('登录成功')
          // 存储token到浏览器
          localStorage.setItem('eleToken', token)
          this.$router.push('/')
        } else {
          Message.error(res.data.resultMsg)
        }
      } catch (error) {
        Message.error('登录失败，请稍后重试')
      }
    },
    async register () {
      try {
        let res = await this.$api.register(this.newUsername, this.newPassword)
        if (res.data.resultCode === 200) {
          const token = 'token'
          Message.success('登录成功')
          // 存储token到浏览器
          localStorage.setItem('eleToken', token)
          this.$router.push('/')
        } else {
          Message.error(res.data.resultMsg)
        }
      } catch (error) {
        Message.error('注册失败，请稍后重试')
      }
    },
    toggleMode () {
      this.showLoginForm = !this.showLoginForm
    }
  }
}
</script>

<style scoped>
.login-register-dialog {
  width: 450px;
  height: 330px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
.lrh2{
  text-align:center;
}
.show-login-form h2 {
  display: block;
}

.show-login-form,
.login-register-btn {
  width: 100%;
}

.login-register-btn {
  background-color: #007bff;
  color: #fff;
  width: 100%;
  height: 40px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.login-register-btn:hover {
  background-color: #0056b3;
}

.toggle-link {
  color: #007bff;
  text-decoration: none;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style>

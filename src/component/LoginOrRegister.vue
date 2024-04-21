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
          <el-col :span="15">
            <el-input  class="captcha-input" type="text" v-model="captchaInput" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="6">
            <img :src="this.captchaImage" @click="refreshCaptcha" class="captcha-img" alt="验证码">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <el-button class="login-register-btn" @click.native="showLoginForm ? login() : register()" type="primary">{{ showLoginForm ? '登录' : '注册' }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <p>{{ showLoginForm ? '你还没有账号吗?' : '已经有账号了吗?' }} <a href="#" @click.prevent="toggleMode" class="toggle-link" @click="transition">{{ showLoginForm ? '注册' : '登录' }}</a></p>
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
  mounted () {
    // 在组件挂载后执行 refreshCaptcha 方法
    this.refreshCaptcha()
  },
  data () {
    return {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      showLoginForm: true,
      captchaInput: '', // 新增验证码字段
      captchaImage: '', // 新增验证码图片字段
      captchaIdKey: ''
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
        let res = await this.$api.login(this.username, this.password, this.captchaInput, this.captchaIdKey)
        if (res.data.code === 0) {
          Message.success('登录成功')
          // 存储token到浏览器
          location.reload()
          localStorage.setItem('token', res.data.token)
        } else {
          location.reload()
          Message.error(res.data.msg)
        }
      } catch (error) {
        location.reload()
        Message.error('登录失败，请稍后重试')
      }
    },
    async refreshCaptcha () {
      // 调用获取验证码的 API
      try {
        let res = await this.$api.captcha()
        if (res.data.code === 0) {
          // 在 Vue 组件中使用验证码和验证码的 ID
          this.captchaIdKey = res.data.idkey
          this.captchaImage = res.data.data
          return this.captchaImage
        } else {
          Message.error(res.data.msg)
          return null
        }
      } catch (error) {
        Message.error('验证码获取失败，请稍后重试')
        return null
      }
    },
    async register () {
      try {
        alert(this.captchaInput)
        let res = await this.$api.register(this.username, this.password, this.captchaInput, this.captchaIdKey)
        if (res.data.code === 0) {
          location.reload()
          Message.success('注册成功')
        } else {
          location.reload()
          Message.error(res.data.msg)
        }
      } catch (error) {
        location.reload()
        Message.error('注册失败，请稍后重试')
      }
    },
    toggleMode () {
      this.refreshCaptcha()
    },
    transition () {
      this.showLoginForm = !this.showLoginForm
    }
  }
}
</script>

<style scoped>
.login-register-dialog {
  width: 460px;
  height: 390px;
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

.captcha-img{
  margin: 0 5px;
  width: 150px;
  height: 40px;
}

</style>

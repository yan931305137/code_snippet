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
            <el-input :type="showLoginForm ? 'text' : 'password'" :id="showLoginForm ? 'username' : 'newUsername'" v-model="username" placeholder="账号"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <el-input :type="showLoginForm ? 'password' : 'text'" :id="showLoginForm ? 'password' : 'newPassword'" v-model="password" placeholder="密码"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <el-button class="login-register-btn" @click="showLoginForm ? login : register" type="primary">{{ showLoginForm ? '登录' : '注册' }}</el-button>
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
    login () {
      // Your login logic here
      console.log('Logging in...')
    },
    register () {
      // Your register logic here
      console.log('Registering...')
    },
    toggleMode () {
      this.showLoginForm = !this.showLoginForm
    }
  }
}
</script>

<style scoped>
/* Add your scoped styles for the dialog here */
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

.show-login-form .form-group {
  display: block;
}

.show-login-form,
.login-register-btn {
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
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

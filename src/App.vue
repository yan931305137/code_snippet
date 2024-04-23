<template>
<div>
  <!-- 头部导航栏 -->
  <header class="header-area single-page">
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="logo-area">
              <router-link to="/"><h1 class="logo-text">Code_Snippet</h1></router-link>
            </div>
          </div>
          <div class="col-lg-10">
            <div class="custom-navbar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="main-menu main-menu-light">
              <ul class="menul">
                <li :class="{ active: isRouteActive('/') }"><router-link to="/">首页</router-link></li>
                <li :class="{ active: isRouteActive('/codes') }"><router-link to="/codes">代码库</router-link></li>
                <li :class="{ active: isRouteActive('/my_code') }"><router-link to="/my_code">我的代码</router-link></li>
                <li :class="{ active: isRouteActive('/my_favorite') }"><router-link to="/my_favorite">我的收藏</router-link></li>
                <li :class="{ active: isRouteActive('/ai_know') }"><router-link to="/ai_know">AI知道</router-link></li>
                <li v-if="!username" class="menu-btn">
                  <a class="login" @click="toggleDialog('login')">登录</a>
                  <a class="register" @click="toggleDialog('register')">注册</a>
                </li>
                <el-dropdown v-if="username" class="menu-username" @mouseover="Dropdown" @mouseout="noDropdown">
                  <span class="span-username">用户 : {{ username }}</span> <!-- 将用户名显示在菜单中 -->
                    <el-dropdown-menu v-show="showDropdown" class="dropdown">
                      <el-dropdown-item @click.native="logouts" class="dropdown-li">退出登录</el-dropdown-item>
                      <el-dropdown-item class="dropdown-li" :class="{ active: isRouteActive('/per_information') }">
                        <router-link class="dropdown-li" to="/per_information">个人信息</router-link>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="overlay" v-show="showDialog"></div>
  <div class="loginOrRegisterContainer" v-show="showDialog"  >
    <button class="close-btn" @click="closeDialog">关闭</button>
    <login-or-register :showDialog="showDialog" :mode="dialogMode"></login-or-register>
  </div>

  <!-- 中间页面区 -->
  <router-view  v-if="isRouterAlive"></router-view>


  <!-- 底部栏 -->
  <footer class="footer-area section-padding">
    <div class="footer-widget">
      <div class="container">
        <div class="row">
          <div class="col-xl-2 col-lg-3">
            <div class="single-widget-home mb-5 mb-lg-0">
              <h3 class="mb-4">我们的项目</h3>
              <ul>
                <li class="mb-2"><a href="#">项目1</a></li>
                <li class="mb-2"><a href="#">项目1</a></li>
                <li class="mb-2"><a href="#">项目1</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xl-5 offset-xl-1 col-lg-6">
            <div class="single-widget-home mb-5 mb-lg-0">
              <h3 class="mb-4">搜索</h3>
              <form action="#">
                <input type="email" placeholder="搜索你想要的代码片段吧" onfocus="this.placeholder = '快去吧'" onblur="this.placeholder = '到这里搜索代码片段'" required>
                <button type="submit" class="template-btn">搜索</button>
              </form>
            </div>
          </div>
          <div class="col-xl-3 offset-xl-1 col-lg-3">
            <div class="single-widge-home">
              <h3 class="mb-4">贡献者</h3>
              <div class="feed">
                <img src="/static/assets/images/feed1.jpg" alt="feed">
                <img src="/static/assets/images/feed2.jpg" alt="feed">
                <img src="/static/assets/images/feed3.jpg" alt="feed">
                <img src="/static/assets/images/feed4.jpg" alt="feed">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-6">
            <span>
              &copy;2024 Code_Snippet | 辽ICP备XXXXXXXX号-XX
              <br/>
              <i class="fa fa-heart-o" aria-hidden="true"></i>by
              <a href="https://dluacm.cn" target="_blank">ACM项目部</a>
            </span>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="social-icons">
              <ul>
                <li><a href="#"><i class="fa fa-github"></i></a></li>
                <li><a href="#"><i class="fa fa-qq"></i></a></li>
                <li><a href="#"><i class="fa fa-weixin"></i></a></li>
                <li><a href="#"><i class="fa fa-weibo"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

<!--  右下角小功能-->
  <div class="support" @click="">
      <i class="fa fa-qrcode black"></i>
  </div>
  <div class="scroll-to-top" v-show="isScrolled" @click="scrollToTop" >
      <i class="fa fa-angle-up black"></i>
  </div>
</div>
</template>

<script>
import LoginOrRegister from '../src/component/LoginOrRegister'
import {Message, MessageBox} from 'element-ui'

export default {
  name: 'app',
  components: {
    LoginOrRegister
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      activeIndex: '1',
      showDialog: false,
      isScrolled: false,
      dialogMode: '', // 添加对话框模式
      username: '',
      showDropdown: false, // 添加显示下拉框的状态
      avatar: '',
      phone: '',
      gender: '',
      email: '',
      birthday: '',
      place: '',
      address: '',
      status: ''
    }
  },
  mounted () {
    this.getInformation()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
     // 页面挂载后立即发送请求获取用户名
    async getInformation () {
      try {
        const res = await this.$api.GetInformation() // 发送GET请求至后端接口
        this.username = res.data.data.UserName
        this.avatar = res.data.data.Avatar
        this.phone = res.data.data.Mobile
        this.gender = res.data.data.Gender
        this.email = res.data.data.Email
        this.birthday = res.data.data.Birthday
        this.place = res.data.data.CityName
        this.address = res.data.data.Address
        this.status = res.data.data.Status
      } catch (error) {
        console.error('获取用户名失败:', error) // 打印错误信息到控制台
      }
    },
    closeDialog () {
      this.showDialog = false
    },
    toggleDialog (mode) {
      this.dialogMode = mode
      this.showDialog = !this.showDialog
    },
    handleScroll () {
      this.isScrolled = window.scrollY > 100 // 滚动超过100像素时显示按钮
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    Dropdown () {
      this.showDropdown = true
    },
    noDropdown () {
      this.showDropdown = false
    },
    logouts () {
      MessageBox.confirm('确定退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 执行退出登录操作
        let res = await this.$api.exit()
        if (res.data.code === 0) {
          location.reload()
          Message.success(res.data.msg)
          localStorage.removeItem('token')
        } else {
          Message.error(res.data.msg)
        }
      }).catch(() => {
        Message.info('取消退出登录')
      })
    },
    persionals () {
      // 跳转到个人中心页面
    },
    isRouteActive (route) {
      return this.$route.path === route
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
.col-lg-10 {
flex: 0 0 70%;
}
.logo-text{
  width: 80px;
    color: #ffffff;
}

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
.support ,
.scroll-to-top{
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  background-color: #eeeeee;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: opacity 0.3s ease;
  padding: 10px;
  border-radius: 20px;
}
.support{
  bottom: 90px;
}

.scroll-to-top {
  bottom: 40px;
  opacity: 0;
}

.scroll-to-top:hover,
.support:hover {
  background-color: #ff9902;
}

.scroll-to-top {
  opacity: 1;
}
ul li{
  padding: 10px 0;
}
.menul li a{
  display: inline-block;
  width: 86px;
  height: 51px;
  text-align: center;
}

.menul li:nth-child(-n+5).active {
  border-bottom: 2px solid white;
  background-color: rgba(119, 119, 119, 0.10);
}
.menul li:nth-child(-n+5):hover {
  background-color: rgba(119, 119, 119, 0.10);
}
.menu-btn{
  margin-left: 50px!important;
  margin-right: -50px!important;
  cursor: pointer;
}
.register,
.login{
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  width: 88px;
  height: 51px;
  text-align: center;
  background-color: transparent;
  padding: 15px 30px;
}
.login:hover,
.register:hover{
  background-color: #ff9902;
}

.black{
  color: #000000;
}
.loginOrRegisterContainer {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  z-index: 999; /* 确保遮罩层在最顶层 */
}

.close-btn {
  position: absolute;
  border: 0.5px solid #dddddd; ;
  background-color: transparent;
  color: #999999;
  cursor: pointer;
  z-index: 1000; /* 确保关闭按钮在遮罩层之上 */
  top: -30px;
  right: 0;
}
.close-btn:hover{
  background-color: #ffffff;
}

.menu-username{
  width: 176px;
  color: #ffffff;
  cursor: pointer;
}

.dropdown {
  margin-left: 120px!important;
  margin-right: -50px!important;
  width: 120px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.dropdown-li{
  color: #000000!important;
}
.span-username{
  margin-left: 120px!important;
  margin-right: -120px!important;
  padding: 10px 0;
  text-align: center;
  margin-bottom: -15px!important;
  display: inline-block;
  width: 110px; /* 设置固定宽度 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.span-username:hover{
  background: rgba(221, 221, 221, 0.1);
}
</style>

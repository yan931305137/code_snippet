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
                  <li :class="{ active: isRouteActive('/') }">
                    <router-link to="/">首页</router-link>
                  </li>
                  <li :class="{ active: isRouteActive('/codes') }">
                    <router-link to="/codes">代码库</router-link>
                  </li>
                  <li :class="{ active: isRouteActive('/my_code') }">
                    <router-link to="/my_code">我的代码</router-link>
                  </li>
                  <li :class="{ active: isRouteActive('/my_favorite') }">
                    <router-link to="/my_favorite">我的收藏</router-link>
                  </li>
                  <li :class="{ active: isRouteActive('/ai_know') }">
                    <router-link to="/ai_know">AI知道</router-link>
                  </li>
                  <li v-if="!username" class="menu-btn">
                    <a class="login" @click="toggleDialog('login')">登录</a>
                    <a class="register" @click="toggleDialog('register')">注册</a>
                  </li>
                  <el-dropdown v-if="username" class="menu-username">
                    <div class="dropdownDiv">
                      <span class="span-username">用户 : {{ username }}</span>
                      <i class="el-icon-arrow-down el-icon--right down"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown" class="dropdown">
                      <el-dropdown-item class="dropdown-li" @click.native="logouts">退出登录</el-dropdown-item>
                      <el-dropdown-item :class="{ active: isRouteActive('/per_information') }" class="dropdown-li">
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
    <div v-show="showDialog" class="overlay"></div>
    <div v-show="showDialog" class="loginOrRegisterContainer">
      <button class="close-btn" @click="closeDialog">关闭</button>
      <login-or-register :mode="dialogMode" :showDialog="showDialog"></login-or-register>
    </div>

    <!-- 中间页面区 -->
    <router-view v-if="isRouterAlive"></router-view>


    <!-- 底部栏 -->
    <footer class="footer-area section-padding">
      <div class="footer-widget">
        <div class="container">
          <div class="row">
            <div class="col-xl-7 col-lg-9">
              <div class="single-widget-home mb-5 mb-lg-0">
                <h3 class="mb-4">我们的项目</h3>
                <ul>
                  <li class="mb-2"><a href="#"></a></li>
                  <li class="mb-2"><a href="#"></a></li>
                  <li class="mb-2"><a href="#"></a></li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 offset-xl-2 col-lg-3">
              <div class="single-widge-home">
                <h3 class="mb-4">贡献者</h3>
                <div class="feed">
                  <a href="https://github.com/yan931305137" target="_blank">
                    <img alt="feed" src="https://avatars.githubusercontent.com/u/65098966?v=4"/>
                  </a>
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
              <i aria-hidden="true" class="fa fa-heart-o"></i>-by
              <a href="https://dluacm.cn" style="color: #00afed" target="_blank">-ACM项目部-</a>
            </span>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="social-icons">
                <ul>
                  <li><a href="https://github.com/dldlu" target="_blank"><i class="fa fa-github"></i></a></li>
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
    <div v-show="isScrolled" class="scroll-to-top" @click="scrollToTop">
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
    if (localStorage.getItem('token') !== null && localStorage.getItem('information') === null) {
      this.getInformation()
    }
    const information = JSON.parse(localStorage.getItem('information'))
    if (information) {
      this.username = information.username
      this.avatar = information.avatar
      this.email = information.email
      this.phone = information.phone
      this.address = information.address
      this.brithday = information.birthday
      this.gender = information.gender
      this.status = information.status
    }
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
        if (res.data.code === 0) {
          const information = {
            username: res.data.data.UserName,
            avatar: res.data.data.Avatar,
            phone: res.data.data.Mobile,
            gender: res.data.data.Gender,
            email: res.data.data.Email,
            birthday: res.data.data.Birthday,
            place: res.data.data.CityName,
            address: res.data.data.Address,
            status: res.data.data.Status
          }
          localStorage.setItem('information', JSON.stringify(information))
        } else {
          Message.error(res.data.msg)
        }
      } catch (error) {
        Message.error('获取用户名失败') // 打印错误信息到控制台
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
          localStorage.removeItem('information')
        } else {
          Message.error(res.data.msg)
        }
      }).catch(() => {
        Message.info('取消退出登录')
      })
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

.logo-text {
  width: 80px;
  color: #ffffff;
}

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.support,
.scroll-to-top {
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

.support {
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

ul li {
  padding: 10px 0;
}

.menul li a {
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

.menu-btn {
  margin-left: 50px !important;
  margin-right: -50px !important;
  cursor: pointer;
}

.register,
.login {
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
.register:hover {
  background-color: #ff9902;
}

.black {
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
  border: 0.5px solid #dddddd;;
  background-color: transparent;
  color: #999999;
  cursor: pointer;
  z-index: 1000; /* 确保关闭按钮在遮罩层之上 */
  top: -30px;
  right: 0;
}

.close-btn:hover {
  background-color: #ffffff;
}

.menu-username {
  width: 176px;
  color: #ffffff;
  cursor: pointer;
}

.dropdown {
  margin-left: 120px !important;
  margin-right: -50px !important;
  margin-top: 20px !important;
  width: 140px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-li {
  color: #000000 !important;
}

.span-username {
  width: 110px; /* 设置固定宽度 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.dropdownDiv {
  text-align: center;
  width: 150px !important;
  margin-left: 80px !important;
  margin-right: -80px !important;
  margin-bottom: -15px !important;
  display: inline-block;
}

.dropdownDiv:hover {
  background: rgba(221, 221, 221, 0.1);
}

.down {
  line-height: 40px;
}
</style>

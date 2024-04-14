<template>
<div>
  <!-- Preloader Starts -->
  <div class="preloader">
    <div class="spinner"></div>
  </div>
  <!-- Preloader End -->

  <!-- Header Area Starts -->
  <header class="header-area single-page">
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
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
                <li class="menu-btn">
                  <a href="#" class="login">登录</a>
                  <a href="#" class="register">注册</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Header Area End -->

  <router-view></router-view>

  <!-- Footer Area Starts -->
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
  <div class="support" @click="">
      <i class="fa fa-qrcode black"></i>
  </div>
  <div class="scroll-to-top" v-show="isScrolled" @click="scrollToTop" >
      <i class="fa fa-angle-up black"></i>
  </div>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isScrolled: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.isScrolled = window.scrollY > 100 // Show button when scrolled down 100px
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    isRouteActive (route) {
      return this.$route.path === route
    }
  }
}
</script>


<style>
.logo-text{
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
  padding: 10px;
}
.menul li a{
  display: inline-block;
  width: 86px;
  height: 51px;
  text-align: center;
}
.menul li:nth-child(-n+4).active {
  border-bottom: 2px solid white;
  background-color: rgba(119, 119, 119, 0.10);
}
.menul li:nth-child(-n+4):hover {
  background-color: rgba(119, 119, 119, 0.10);
}
.menu-btn{
  margin: 0;
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
</style>

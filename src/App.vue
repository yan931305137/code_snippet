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
                <img src="static/assets/images/feed1.jpg" alt="feed">
                <img src="static/assets/images/feed2.jpg" alt="feed">
                <img src="static/assets/images/feed3.jpg" alt="feed">
                <img src="static/assets/images/feed4.jpg" alt="feed">
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
              &copy;2024 All rights reserved
              <i class="fa fa-heart-o" aria-hidden="true"></i>by
              <a href="https://www.XXXX.com" target="_blank">ACM项目部</a>
            </span>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="social-icons">
              <ul>
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
                <li><a href="#"><i class="fa fa-behance"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div class="support" @click="">
    <svg t="1712848740764" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="978" width="100" height="100"><path d="M154.265344 408.822012a408.822012 408.822012 0 0 0 408.822012 408.822011 51.102751 51.102751 0 1 0 0-102.205503 306.616509 306.616509 0 1 1 306.616509-306.616508 298.797788 298.797788 0 0 1-58.512651 180.239404 51.102751 51.102751 0 0 0 82.63315 60.147939A398.499256 398.499256 0 0 0 971.909368 408.822012 408.822012 408.822012 0 1 0 154.265344 408.822012z m526.869368 129.187755a153.308254 153.308254 0 0 1-216.880077-2.248521 51.102751 51.102751 0 0 1 73.076934-71.543852 51.102751 51.102751 0 0 0 72.259291 0.766542 51.102751 51.102751 0 0 1 71.543852 73.076934zM239.402528 817.644023H256.470847a51.102751 51.102751 0 1 0 0-102.205503h-17.017216A187.39379 187.39379 0 0 0 52.059841 902.83231 119.222719 119.222719 0 0 0 171.282561 1022.055029h735.573004A51.102751 51.102751 0 0 0 971.909368 971.769922V970.952278a51.102751 51.102751 0 0 0-23.916088-43.284031l-144.109759-145.949458a51.102751 51.102751 0 1 0-72.719215 71.850469L796.575827 919.849526H171.333663A17.017216 17.017216 0 0 1 154.265344 902.83231C154.265344 855.817779 192.387997 817.644023 239.453631 817.644023z" fill="#000000" p-id="979"></path></svg>
  </div>
  <div class="scroll-to-top" v-show="isScrolled" @click="scrollToTop">
    <svg t="1712848877765" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="100" height="100"><path d="M871.765333 806.762667h95.722667a9.877333 9.877333 0 0 0 7.808-16l-436.053333-558.293334a39.466667 39.466667 0 0 0-62.293334 0l-436.053333 558.293334a9.856 9.856 0 0 0 7.786667 16h95.722666a20.032 20.032 0 0 0 15.616-7.573334l348.010667-445.845333 348.117333 445.866667c3.712 4.693333 9.536 7.552 15.616 7.552z" fill="#000000" p-id="1951"></path></svg>
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
</style>

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
              <ul>
                <li class="active"><router-link to="/">首页</router-link></li>
                <li><router-link to="/codes">代码库</router-link></li>
                <li><router-link to="/my_code">我的代码</router-link></li>
                <li><router-link to="/my_favorite">我的收藏</router-link></li>
                <li class="menu-btn">
                  <a href="#" class="login">登录</a>
                  <a href="#" class="template-btn">注册</a>
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
                <input type="email" placeholder="" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your email here'" required>
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
                <img src="static/assets/images/feed5.jpg" alt="feed">
                <img src="static/assets/images/feed6.jpg" alt="feed">
                <img src="static/assets/images/feed7.jpg" alt="feed">
                <img src="static/assets/images/feed8.jpg" alt="feed">
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
  <!-- Footer Area End -->

</div>
</template>
<script>
export default {
  name: 'app'
}
</script>


<style>
.logo-text{
    color: #ffffff;
}
</style>

<template>
  <div class="home">
    <Header />
    <header class="home-header header" id="largeHeader">
      <nav class="hb-menu" :class="[hbShow ? 'show-nav': '']">
        <a class="hb-btn j_hbmenu-switch" @click="swicthHb" href="javascript:;">
          <span aria-hidden="true"></span>
        </a>
        <span aria-hidden="true" gu class="hb-nav-bg"></span>
        <ul class="hb-nav j_hbnav">
          <li class="li cur">
            <router-link to='/home'><i class="icon-home"></i> 主页</router-link>
          </li>
          <li class="li">
            <router-link to='/sidebarItem'><i class="icon-tags"></i> 分类</router-link>
          </li>
          <li class="li">
            <router-link to='/about'><i class="icon-heart"></i>关于</router-link>
          </li>
        </ul>
      </nav>
      <!-- <a href="javascript:;" class="login-btn j_login-btn" @click="">登录</a> -->
      <canvas id="bubbleCanvas"></canvas>
      <div class="sign-me" style='background-image:url("/img/dxLogo_w.png")'></div>
      <a href="javascript:;" class="r-r-btn blogger-resume-btn">下载博主简历</a>
      <div class="blogger-hd">
        <div class="img" style="background-image:url(/img/by_bg.jpg)"></div>
      </div>
    </header>
    <homeCont :stickContent="stickCont" :lastContent="lastCont" />
  </div>
</template>
<script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  import homeCont from '@/components/homeCont.vue'
  import bubble from '@/assets/js/bubble.js'
  import http from '@/api/http.js'
  export default {
    data() {
      return {
        serverUrl: process.env.VUE_APP_serverURL,
        hbShow: false,
        stickCont: {},
        lastCont: {}
      }
    },
    mounted() {
      bubble();
      const url = this.serverUrl;
      http.get(url).then(res => {
        let data = res.data;
        if (data.resCode === 1) {
          this.stickCont = data.content[0];
          this.lastCont = data.content[1];
        }
      })
    },
    methods: {
      swicthHb() {
        this.hbShow = !this.hbShow
      }
    },
    name: 'home',
    components: {
      Header,
      homeCont
    }
  }
</script>
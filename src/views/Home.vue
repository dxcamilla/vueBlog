<template>
  <div class="home">
    <Header></Header>
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
    <!-- <homeCont :Content="Content" /> -->
    <div v-if="Content.length > 0" class="container max-1180 home-container">
      <div class="tab-wrap">
        <div class="tab-list cur"><i class="icon-home"></i> 主页</div>
        <div class="tab-list"><i class="icon-tags"></i> 分类</div>
        <div class="tab-list"><i class="icon-heart"></i> 关于</div>
      </div>
      <div class="blog-part stick">
        <div class="chief-block">
          <div class="chief-tt blog-left">
            <div class="tag">
              <div class="tag-in">
                <i class="icon-pushpin"></i>置顶
              </div>
            </div>
            <h3 class="cat-tt">{{Content[0].title}}</h3>
          </div>
          <div class="chief-summary blog-right">
            <p class="summary">{{Content[0].summary}}</p>
            <a href="#" class="more">More</a>
          </div>
        </div>
      </div>
      <div class="blog-part">
        <div class="chief-block">
          <div class="chief-summary blog-left">
            <p class="summary">{{Content[1].summary}}</p>
            <a href="#" class="more">More</a>
          </div>
          <div class="chief-tt blog-right">
            <div class="tag">
              <div class="tag-in">
                <i class="icon-refresh"></i>最新
              </div>
            </div>
            <h3 class="cat-tt">{{Content[1].title}}</h3>
            <!-- content::{{content}} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  import bubble from '@/assets/js/bubble.js'
  import { api_home } from '@/api/index'
  export default {
    data() {
      return {
        serverUrl: process.env.VUE_APP_serverURL,
        hbShow: false,
        stickCont: {},
        lastCont: {},
        Content: []
      }
    },
    mounted() {
      bubble();
      this.searchContent()
    },
    methods: {
      searchContent() {
        api_home().then(res => {
          this.Content = res.content
        })
      },
      swicthHb() {
        this.hbShow = !this.hbShow
      }
    },
    name: 'home',
    components: {
      Header
    }
  }
</script>
<template>
  <div class="common-header-wrap">
    <header class="header common-header">
      <div class="cm-navbar">
        <router-link to="/">
          <div class="list cur">主页</div>
        </router-link>
        <router-link to="/home">
          <div class="list">分类</div>
        </router-link>
        <router-link to="/about">
          <div class="list">关于</div>
        </router-link>
      </div>
      <a v-if="!isLogin" href="javascript:;" class="login-btn j_login-btn" @click="loginPop">登录</a>
      <div v-else class="userInfo-entry-wrap">
        <div class="user-header" style='background-image:url("/img/by_bg.jpg")' id='userInfoPopBtn'></div>
        <div class="user-info-pop wap-hide" id="userInfoPop">
          <div class="user-pop-inner">
            <i class="icon close-icon"></i>
            <div class="pop-top">
              <div class="user-header hd2" style="background-image:url(/img/by_bg.jpg)"></div>
              <h3 class="user-name">{{loginUser.userName}}</h3>
            </div>
            <div class="info-lists">
              <router-link v-if="loginUser.isAdmin" to="/admin">
                <div class="list">后台管理</div>
              </router-link>
              <router-link to="/admin">
                <div class="list">内容二</div>
              </router-link>
              <router-link to="/admin">
                <div class="list">内容三</div>
              </router-link>
              <a href="javascript:;" id="logoutBtn">
                <div class="list logout" @click="logoutFun">退出</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div v-if="isShowLogin" class="login-pop-wrap j_popup" id="loginPop">
      <i class="close-icon el-icon-close" @click="closePop"></i>
      <!-- <i class="close-icon j_close icon-remove" ></i> -->
      <component :is="$store.state.loginPopCont"></component>
    </div>
  </div>
</template>
<script>
  import LoginCont from '@/components/loginTemp/LoginCont.vue'
  import RgstCont from '@/components/loginTemp/RgstCont.vue'
  import SetPwdCont from '@/components/loginTemp/SetPwdCont.vue'
  import RgstSuccessCont from '@/components/loginTemp/RgstSuccessCont.vue'
  import { mapState, mapMutations } from 'vuex'
  import cookie from '@/assets/js/cookie.js'
  export default {
    name: 'Header',
    components: {
      LoginCont,
      RgstCont,
      SetPwdCont,
      RgstSuccessCont
    },
    mounted() {

    },
    data() {
      return {
        serverUrl: process.env.VUE_APP_serverURL,
        loginAccount: '',
        loginPwd: '',
        userInfo: {},
        loginHtml: ''
      }
    },
    computed: {
      ...mapState(['isLogin', 'isShowLogin', 'loginUser'])
    },
    methods: {
      ...mapMutations([
        'saveLoginUser',
        'showLogin',
        'changeLogin',
        'popSwitch'
      ]),
      loginPop() {
        this.showLogin(true)
      },
      closePop() {
        this.showLogin(false)
      },
      logoutFun() {
        cookie.delCookie('loginToken')
        this.saveLoginUser({
          token: '',
          user: '',
          isLogin: false
        })
        this.changeLogin(false)
        this.popSwitch("LoginCont")
      }
    },
    props: {
    }
  }
</script>
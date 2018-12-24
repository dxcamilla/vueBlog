<template>
  <div class="login-content">
    <h1 class="login-tt">登录<a href="javascript:;" class="y-a-line j_register-btn" @click="rgstPopEmit">注册</a></h1>
    <div class="in-label">
      <input class="in j_userAccount" type="text" placeholder="请输入邮箱" v-model.trim="loginAccount" />
    </div>
    <div class="in-label pstr">
      <input class="in j_pwd" type="password" placeholder="请输入密码" v-model.trim="loginPwd" />
      <i class="cap-icon icon-font" style="display:none"></i>
    </div>
    <div class="lg-err-tip">{{loginTip}}</div>
    <div class="auto-login-box">
      <label class="auto-login lbl">
        <input id="autoLogin" type="checkBox" class="auto-login-ck ckbox" checked="true">
        <span class="ck-btn cked"></span>
        自动登录</label>
      <a class="forget-pwd gray-12" href="javascript:;" @click="resetPwd">重置密码</a>
    </div>
    <div class="btn-wrap">
      <button class="r-r-btn j_confirm" id="confirmLogin" @click="loginFun">登录</button>
    </div>
  </div>
</template>
<script>
  import http from '@/api/http.js'
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        serverUrl: process.env.VUE_APP_serverURL,
        // isLogin: false,
        loginAccount: '',
        loginPwd: '',
        errtip: ''
      }
    },
    computed: {
      ...mapState(['loginTip', 'loginUser', 'isLogin'])
    },


    methods: {
      ...mapMutations([
        'popSwitch',
        'rgstOrForgetPwd'
      ]),
      ...mapActions([
        'loginAction',
        'getInfo'
      ]),
      loginFun() {
        this.loginAction({
          userAccount: this.loginAccount,
          pwd: this.loginPwd
        })
      },
      rgstPopEmit() {
        this.popSwitch("RgstCont")
        this.rgstOrForgetPwd(false)
      },
      resetPwd() {
        this.popSwitch("RgstCont")
        this.rgstOrForgetPwd(true)

      }
    }
  }
</script>
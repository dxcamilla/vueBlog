<template>
  <div class="login-content">
    <h1 class="login-tt">注册<a href="javascript:;" class="y-a-line j_login-btn" @click="loginPopEmit">登录</a></h1>
    <div class="in-label">
      <input v-if="!isForgetPwd" class="in j_userAccount" type="text" placeholder="请输入昵称" v-model="username">
    </div>
    <div class="in-label pstr">
      <input class="in j_rgstPwd1" type="password" placeholder="请输入密码" v-model="pwd1">
      <i class="cap-icon icon-font" style="display:none"></i>
    </div>
    <div class="in-label pstr">
      <input class="in j_rgstPwd2" type="password" placeholder="请再次确认密码" v-model="pwd2">
      <i class="cap-icon icon-font" style="display:none"></i>
    </div>
    <div class="lg-err-tip">{{errtip}}</div>
    <div class="btn-wrap">
      <button class="r-r-btn j_confirm" @click="rstSecondStep($event)">下一步</button>
    </div>
  </div>
</template>
<script>
  import { loginFormatCheck } from '@/assets/js/common.js'
  import http from '@/api/http.js'
  import { user_setPwd } from '@/api/login/accountRequest'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        serverUrl: process.env.VUE_APP_serverURL,
        username: '',
        pwd1: '',
        pwd2: '',
        errtip: ''
      }
    },
    computed: {
      ...mapState([
        'rgstUser',
        'isForgetPwd'
      ])
    },
    methods: {
      ...mapMutations([
        'popSwitch',
        'saveRgstUser',
      ]),
      rstSecondStep(e) {
        let args = { "password2": this.pwd1, "password": this.pwd2 };
        if (loginFormatCheck(args) === true) {
          user_setPwd({
            userAccount: this.rgstUser.userAccount,
            userName: this.username,
            pwd1: this.pwd1,
            pwd2: this.pwd2,
            isForgetPwd: this.isForgetPwd
          }).then(res => {
            this.saveRgstUser({
              userAccount: this.rgstUser.userAccount,
              pwd: this.pwd1
            })
            this.popSwitch("RgstSuccessCont")
            this.errtip = res.resMsg
          }).catch(err => {
            this.errtip = err
          })
        }
      },
      loginPopEmit() {
        this.popSwitch("LoginCont")
      },
    }
  }
</script>
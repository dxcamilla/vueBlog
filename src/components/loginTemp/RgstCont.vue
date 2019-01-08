<template>
  <div class="login-content">
    <h1 class="login-tt">注册<a href="javascript:;" class="y-a-line" @click="loginPopEmit">登录</a></h1>
    <div class="in-label">
      <input class="in j_userAccount" type="text" placeholder="请输入邮箱" v-model.trim="rgstMail">
    </div>
    <div class="in-label auth-code-wrap">
      <input type="text" class="in j_mailCode" placeholder="请输入邮箱验证码" v-model.trim="verCode">
      <div class="img-box">
        <button data-able="true" class="gray-brd-btn getcode-btn" @click="sendVerCode($event)">{{sendTip}}</button>
      </div>
    </div>
    <div class="lg-err-tip">{{errtip}}</div>
    <div class="btn-wrap">
      <button class="r-r-btn j_confirm" id="rstFirstStep" @click="rgstFirstStep($event)">下一步</button>
    </div>
  </div>
</template>
<script>
  import { loginFormatCheck } from '@/assets/js/common.js'
  import http from '@/api/http.js'
  import { user_sendCode, user_rgstFirstStep } from '@/api/login/accountRequest'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        serverUrl: process.env.VUE_APP_serverURL,
        rgstMail: '',
        verCode: '',
        errtip: '',
        sendTip: '发送验证码'
      }
    },
    computed: {
      ...mapState(['isForgetPwd'])
    },
    methods: {
      ...mapMutations([
        'popSwitch',
        'saveRgstUser'
      ]),
      sendVerCode(e) {
        let _this = e.currentTarget
        if (_this.getAttribute("data-able") == "false") {
          return false;
        }
        let accountTxt = this.rgstMail;
        let args = { "account": accountTxt };
        if (loginFormatCheck(args) === true) {
          user_sendCode({
            userAccount: accountTxt,
            isForgetPwd: this.isForgetPwd
          }).then(res => {
            let timeNum = 60;
            var timer = setInterval(() => {
              if (timeNum > 0) {
                timeNum--;
                this.sendTip = `( ${timeNum} s)`;
                _this.setAttribute("data-able", false);
              } else {
                clearInterval(timer);
                this.sendTip = "发送验证码";
                _this.setAttribute("data-able", true);
              }
            }, 1000)
            this.errtip = res.resMsg
          }).catch(err => {
            this.errtip = err
          })
        } else {
          this.errtip = loginFormatCheck(args)
        }
      },
      rgstFirstStep(e) {
        let _this = e.currentTarget,
          userAccount = this.rgstMail,
          mailCode = this.verCode;
        let args = { "account": userAccount, "mailCode": mailCode };
        if (loginFormatCheck(args) === true) {
          user_rgstFirstStep({
            userAccount: userAccount,
            mailCode: mailCode,
            isForgetPwd: this.isForgetPwd
          }).then(res => {
            this.popSwitch("SetPwdCont")
            this.saveRgstUser({ userAccount: userAccount })
            this.errtip = res.resMsg
          }).catch(err => {
            console.log(err)
            this.errtip = err
          })
        } else {
          this.errtip = loginFormatCheck(args)
        }
      },
      loginPopEmit() {
        this.popSwitch("LoginCont")
      },
    }
  }
</script>
<template>
  <div class="login-content rgstsuccess-content">
    <div class="success-icon"></div>
    <a href="javascript:;" @click="loginFun">一键登录</a>
    <div class="lg-err-tip">{{loginTip}}</div>
  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        errtip: ''
      }
    },
    computed: {
      ...mapState([
        'rgstUser',
        'loginTip'
      ]),
    },
    methods: {
      ...mapActions([
        'loginAction'
      ]),
      loginFun() {
        this.loginAction({
          userAccount: this.rgstUser.userAccount,
          pwd: this.rgstUser.pwd
        })
      },
    }
  }
</script>
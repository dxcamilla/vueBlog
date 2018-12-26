import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/api/http.js'
import cookie from '@/assets/js/cookie.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // state全局状态树
  state: {
    loginUser: {},
    loginPopCont: 'LoginCont',
    isLogin: false,
    isShowLogin: false,
    rgstUser: {},
    loginTip: '',
    isForgetPwd: false,
    token: '',
    test: {

    }
  },
  mutations: {
    // 突变就是定义方法，第一个参数是state,第二个参数是载荷
    //修改登录弹框内容
    popSwitch (state, compName) {
      state.loginPopCont = compName
    },
    setTest (state, test) {
      state.test = test.val1
    },
    setToken (state, token) {
      state.token = token
    },
    //保存登录用户的token信息,更改登录状态
    saveLoginUser (state, { user, isLogin }) {
      state.loginUser = user
      state.isLogin = isLogin
    },
    //更改登录状态
    changeLogin (state, loginState) {
      state.isLogin = loginState
    },
    //返回登录、注册提示语
    changeLoginTip (state, tip) {
      state.loginTip = tip
    },
    //显示登录弹框
    showLogin (state, show) {
      state.isShowLogin = show
      if (!show) {
        document.getElementsByTagName('body')[0].removeAttribute('class')
      }
      else {
        document.getElementsByTagName('body')[0].setAttribute('class', 'pop-bd')
      }
    },
    saveRgstUser (state, user) {
      state.rgstUser = user
    },
    //忘记密码or注册
    rgstOrForgetPwd (state, bool) {
      state.isForgetPwd = bool
    }
  },
  actions: {
    loginAction ({ commit }, userInfo) {
      let { userAccount = '', pwd = '' } = userInfo;
      return new Promise((resolve, reject) => {
        let url = process.env.VUE_APP_serverURL + '/api/user/login'
        http.post(url, {
          userAccount: userAccount,
          pwd: pwd
        }).then(res => {
          let data = res.data;
          if (data.resCode === 1) {
            let token = data.userToken
            console.log(data)
            cookie.setCookie('loginToken', token, 7)
            commit('saveLoginUser', {
              user: data.userInfo,
              isLogin: true
            })
            commit('showLogin', false)
          }
          commit('changeLoginTip', data.resMsg)
          resolve()
        }).catch(err => {
          commit('changeLoginTip', err)
          reject(err)
        })
      })
    },
    // getInfo ({ commit }) {
    //   setTimeout(() => {
    //     commit('  ', 123)

    //     commit('changeLogin', true)
    //     commit('showLogin', false)
    //     commit('saveLoginUser', {
    //       user: 123,
    //       isLogin: true
    //     })
    //   }, 1500)
    // }
  }
})

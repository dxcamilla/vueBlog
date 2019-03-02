import Vue from 'vue';
import metaInfo from 'vue-meta-info'
// import Element from 'element-ui';
// import { Container, Header, Aside, Main, Footer, Button, Select, Table, TableColumn } from 'element-ui';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import '@/assets/css/font-awesome.min.css';
import '@/assets/css/main.scss';
import { user_tokenLogin } from '@/api/login/tokenLogin';
import cookie from '@/assets/js/cookie';

Vue.use(Element, { size: 'small', zIndex: 1000 });
Vue.use(metaInfo)
Vue.config.productionTip = false;
// const whiteList = ['/', '/admin']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  let token = store.state.token || cookie.getCookie('loginToken') || '';
  if (token && !store.state.isLogin) {
    user_tokenLogin().then(res => {
      console.log(res)
      store.commit('saveLoginUser', {
        user: res.userInfo,
        isLogin: true
      });
      store.commit('changeLogin', true);
    });
    next();
    return;
  }
  next();
});
new Vue({
  router,
  store, // 在入口文件main.js中设置了store之后，在所有的子组件.vue中都可以通过$store访问到vuex中的state数据
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }

}).$mount('#app');

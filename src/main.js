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
  console.log(token === '');
  if (token && !store.state.isLogin) {
    // 如果有token自动登录
    user_tokenLogin().then(res => {
      store.commit('saveLoginUser', {
        user: res.userInfo,
        isLogin: true
      });
      store.commit('changeLogin', true);
      const admins = res.userInfo.isAdmin;
      store.dispatch('GenerateRoutes', { admins }).then(() => { //生成可访问路由表
        router.addRoutes(store.state.permission.addRouters);//添加动态路由
        next({ ...to, replace: true });//router.addRoutes可能会导致next()失效，做个hack
      }).catch(err => {
        console.log(err)
      })
    });
    if (to.matched.some(res => res.meta.admins)) {
      console.log('aaaaaa');
      next();
    } else {
      next();
    }
  }
  if (to.redirectedFrom) {
    console.log(to.redirectedFrom)
    // window.location.reload();
    // router.go(0);
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

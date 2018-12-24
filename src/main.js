import Vue from 'vue'
// import Element from 'element-ui';
import { Button, Select, Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import '@/assets/css/font-awesome.min.css'
import '@/assets/css/main.scss'
import cookie from '@/assets/js/cookie.js'
// Vue.use({ Element }, { size: 'small', zIndex: 1000 })
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 1000 };
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.config.productionTip = false;
const whiteList = ['/', '/about'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  let token = store.state.token || cookie.getCookie('loginToken') || '';
  if (token) {
    if (whiteList.indexOf(to.path) >= 0) {
      console.log(token)
      // store.dispatch('loginAction', {
      //   token: token
      // });
      next()
      return
    }
  }
  next();
});
new Vue({
  router,
  store, //在入口文件main.js中设置了store之后，在所有的子组件.vue中都可以通过$store访问到vuex中的state数据
  render: h => h(App)
}).$mount('#app');

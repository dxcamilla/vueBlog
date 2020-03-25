import Vue from 'vue'
import Vuex from 'vuex'
import permission from './permission'
import stores from './store'
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    permission,
    stores
  }
});
export default store;
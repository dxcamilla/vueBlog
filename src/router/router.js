import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import sidebarItem from '../views/sidebar-item'
import adminPage from '../views/admin/adminPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/admin',
      name: 'adminPage',
      component: adminPage
    },
    {
      path: '/sidebarItem',
      name: 'sidebarItem',
      component: sidebarItem
    },
  ]
})

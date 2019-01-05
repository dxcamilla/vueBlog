import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import sidebarItem from '../views/sidebar-item'
import adminPage from '../views/admin/adminPage'
import admin from '../views/Layout/admin'
import usersCont from '@/components/adminTemp/usersCont.vue'
import categoryCont from '@/components/adminTemp/categoryCont.vue'
import contentCont from '@/components/adminTemp/contentCont.vue'

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
      redirect: '/admin/usersCont',
      name: 'admin',
      component: admin,
      children: [
        {
          path: 'usersCont',
          name: 'usersCont',
          component: usersCont
        },

        {
          path: 'categoryCont',
          name: 'categoryCont',
          component: categoryCont
        },
        {
          path: 'contentCont',
          name: 'contentCont',
          component: contentCont
        },
      ]
    },

  ]
})

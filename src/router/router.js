import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import admin from '../views/Layout/admin'
import usersCont from '@/views/Layout/adminTemp/usersCont.vue'
import categoryCont from '@/views/Layout/adminTemp/categoryCont.vue'
import contentCont from '@/views/Layout/adminTemp/contentCont.vue'

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

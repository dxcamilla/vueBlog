import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Detail from '../views/Detail'
import Categories from '../views/Categories'
import admin from '../views/admin'
import usersCont from '@/views/Layout/adminTemp/usersCont.vue'
import categoryCont from '@/views/Layout/adminTemp/categoryCont.vue'
import tagCont from '@/views/Layout/adminTemp/tagCont.vue'
import contentCont from '@/views/Layout/adminTemp/contentCont.vue'
import addContent from '@/views/Layout/adminTemp/addContent.vue'
import showContent from '@/views/Layout/adminTemp/showContent.vue'

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
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/categories',
      // redirect: '/categories',
      name: 'categories',
      component: Categories
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
          path: 'tagCont',
          name: 'tagCont',
          component: tagCont
        },
        {
          path: 'contentCont',
          name: 'contentCont',
          component: contentCont
        },
        {
          path: 'addContent',
          name: 'addContent',
          component: addContent
        },
        {
          path: 'showContent',
          name: 'showContent',
          component: showContent
        },

      ]
    },
  ]
})

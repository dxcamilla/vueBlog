import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About'
import Categories from '@/views/Categories'
// import Detail from '../views/Detail'
// import admin from '@/views/admin'
// import usersCont from '@/views/Layout/adminTemp/usersCont.vue'
// import categoryCont from '@/views/Layout/adminTemp/categoryCont.vue'
// import tagCont from '@/views/Layout/adminTemp/tagCont.vue'
// import contentCont from '@/views/Layout/adminTemp/contentCont.vue'
// import addContent from '@/views/Layout/adminTemp/addContent.vue'
// import showContent from '@/views/Layout/adminTemp/showContent.vue'
Vue.use(Router)
export const staticRouterMap = [
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
    path: '/detail/:contId',
    name: 'detail',
    props: true,
    component: () => import('@/views/Detail')
  },
  {
    path: '/categories/:cateId',
    // redirect: '/categories',
    name: 'categories',
    props: true,
    component: Categories
  },


]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: staticRouterMap
})
export const asyncRouterMap = [
  {
    path: '/admin',
    redirect: '/admin/usersCont',
    name: 'admin',
    component: () => import('@/views/admin'),
    meta: { admins: [1, 2] },
    children: [
      {
        path: 'usersCont',
        name: 'usersCont',
        meta: { admins: [1, 2] },
        component: () => import('@/views/Layout/adminTemp/usersCont.vue'),

      },
      {
        path: 'categoryCont',
        name: 'categoryCont',
        meta: { admins: [1, 2] },
        component: () => import('@/views/Layout/adminTemp/categoryCont.vue'),
      },
      {
        path: 'tagCont',
        name: 'tagCont',
        meta: { admins: [1, 2] },
        component: () => import('@/views/Layout/adminTemp/tagCont.vue'),
      },
      {
        path: 'contentCont',
        name: 'contentCont',
        meta: { admins: [1, 2] },
        component: () => import('@/views/Layout/adminTemp/contentCont.vue'),
      },
      {
        path: 'addContent',
        name: 'addContent',
        meta: { admins: [1, 2] },
        component: () => import('@/views/Layout/adminTemp/addContent.vue'),
      },
      {
        path: 'showContent',
        name: 'showContent',
        meta: { admins: [1, 2] },
        component: () => import('@/views/Layout/adminTemp/showContent.vue'),
      },
    ]
  },
  // { path: '*', redirect: '/404', hidden: true }
]

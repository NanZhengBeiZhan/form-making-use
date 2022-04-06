import Vue from 'vue'
import Router from 'vue-router'
import { Layout, Content } from '../layout' // 页面整体布局

process.env.NODE_ENV === 'development' ? Vue.use(Router) : null

/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
const whiteList = ['/']
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/index',
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login'),
    hidden: true,
  },

  {
    path: '/',
    name: 'index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'icondashboard',
    },
    noDropdown: true,
    children: [
      {
        path: 'index',
        meta: {
          title: '首页',
          icon: 'icondashboard',
          routerType: 'leftmenu',
        },
        component: () => import('@/page/index/index'),
      },
    ],
  },
]

//注册路由
export default new Router({
  mode: 'history', // 默认为'hash'模式
  // base: '/permission/', // 添加跟目录,对应服务器部署子目录
  routes: constantRouterMap,
})

//异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: '/form',
    name: 'form',
    component: Layout,
    meta: {
      title: '生成表单',
    },
    noDropdown: false,
    children: [
      {
        path: 'form-making',
        meta: {
          title: '表单设计器',
          routerType: 'leftmenu',
        },
        component: () => import('@/page/form/form-making'),
      },
      {
        path: 'generate-form-research',
        meta: {
          title: '实例-爱好调查',
          routerType: 'leftmenu',
        },
        component: () => import('@/page/form/form-generate-research'),
      },
    ],
  },
  {
    path: '/automation',
    name: 'automation',
    component: Layout,
    meta: {
      title: '自动化生成',
    },
    noDropdown: false,
    children: [
      {
        path: 'automation-generate',
        meta: {
          title: '一键生成',
          routerType: 'leftmenu',
        },
        component: () => import('@/page/automation/automation-generate'),
      },
    ],
  },
  {
    path: '/example',
    name: 'example',
    component: Layout,
    meta: {
      title: '封装实例',
    },
    noDropdown: false,
    children: [
      {
        path: 'goods-form',
        meta: {
          title: '添加商品',
          routerType: 'leftmenu',
        },
        component: () => import('@/page/example/goods-form'),
      },

    ],
  },
  { path: '*', redirect: '/404', hidden: true },
]

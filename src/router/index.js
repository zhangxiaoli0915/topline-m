import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

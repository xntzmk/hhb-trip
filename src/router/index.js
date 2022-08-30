import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/home/home-index.vue')
    },
    {
      path: '/favor',
      component: () => import('@/views/favor/favor-index.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/order-index.vue')
    },
    {
      path: '/profile',
      component: () => import('@/views/profile/profile-index.vue')
    },
    {
      path: '/city',
      component: () => import('@/views/city/city-index.vue'),
      meta: {
        hideTabBar: true
      }
    }
  ]
})

export default router

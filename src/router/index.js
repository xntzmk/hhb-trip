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
      component: () => import('@/views/home/the-home.vue')
    },
    {
      path: '/favor',
      component: () => import('@/views/favor/the-favor.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/the-order.vue')
    },
    {
      path: '/profile',
      component: () => import('@/views/profile/the-profile.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/Auth/UserView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/Auth/LogoutView.vue'),
      meta: { requiresAuth: true }
    },
    /**
     * Maps
     */
    {
      path: '/map',
      name: 'bookstores',
      component: () => import('../views/Maps/BookstoresView.vue')
    },
  ]
})

router.beforeResolve(async (to, from, next) => {

  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && store.isAuthenticated) {
    return next({ name: 'home' })
  } else {
    next()
  }
})

export default router

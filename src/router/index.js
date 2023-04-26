// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AppBar from "@/layouts/default/TheAppBar"
import Home from '@/views/app/HomeView'
import Folder from '@/views/app/MyFolderView'
import Login from "@/views/LoginView"
import { useUserStore } from '@/store/userStore'


const requireGuest = (to, from, next) => {
const userStore = useUserStore()

  if (userStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
}

const requireAuth = (to, from, next) => {
const userStore = useUserStore()

  if (userStore.isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: AppBar,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/folder',
        name: 'My Folder',
        component: Folder,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login View',
    component: Login,
    beforeEnter: requireGuest
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    requireAuth(to, from, next)
  } else {
    next()
  }
})

export default router

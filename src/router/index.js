// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AppBar from "@/layouts/default/TheAppBar"
import Home from '@/views/app/HomeView'
import Folder from '@/views/app/MyFolderView'
import Login from "@/views/LoginView"
import { useUserStore } from '@/store/userStore'
import Bank from "@/views/app/BankView"


const requireGuest = async (to, from, next) => {
  const userStore = useUserStore()
  const valid = await userStore.checkTokenValidity()
  // const valid = userStore.isTokenValid
  if (valid) {
    next('/')
  } else {
    next()
  }
}

// Untuk mengecek sudah/belum login, kalo belum login dulu Bang.
const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  const valid = await userStore.checkTokenValidity()
  // const valid = userStore.isTokenValid
  if (valid) {
    next()
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
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
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/master/bank',
        name: 'Bank',
        component: Bank,
        meta: {
          requiresAuth: true
        }
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

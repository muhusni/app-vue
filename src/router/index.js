// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AppBar from "@/layouts/default/TheAppBar"
import Home from '@/views/app/HomeView'
import Folder from '@/views/app/MyFolderView'
import Login from "@/views/LoginView"
import Tiket from "@/views/app/TiketView/TiketView"
import Insw from "@/views/app/InswView"
import Ceisa40PreRespon from "@/views/app/Ceisa40PreResponView"
import Dashboard from "@/views/app/Dashboard"
import { useUserStore } from '@/store/userStore'


const requireGuest = async (to, from, next) => {
  const userStore = useUserStore()
  const valid = await userStore.checkTokenValidity()
  if (valid) {
    next('/')
  } else {
    next()
  }
}

// Untuk mengecek sudah/belum login, kalo belum login dulu Bang.
const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  // const valid = true
  const valid = await userStore.checkTokenValidity()
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
        path: '/tiket',
        name: 'Tiket BC Soetta',
        component: Tiket,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/insw',
        name: 'INSW',
        component: Insw,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/ceisa40prerespon',
        name: 'Ceisa 40 Pre-Respon',
        component: Ceisa40PreRespon,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/dashboard',
        name: 'Dashboard Duktek',
        component: Dashboard,
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

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AppBar from "@/layouts/default/TheAppBar"
import Home from '@/views/app/HomeView'
import Folder from '@/views/app/MyFolderView'
import Login from "@/views/LoginView"
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
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

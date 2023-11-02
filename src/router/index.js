import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/LoginRegister',
      name: 'Connexion-inscription',
      component: () => import('../views/LoginRegister.vue')
    },
    {
      path: '/mon-compte',
      name: 'mon-compte',
      component: () => import('../views/MonCompte.vue')
    },
  ]
})

export default router

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
    {
      path: '/administration',
      name: 'administration',
      component: () => import('../views/admin/Administration.vue'),
      children: [
        {
          path: 'usersmanagement',  // ceci est relatif à '/administration'
          name: 'usersmanagement',
          component: () => import('../views/admin/UsersManagement.vue')
        },
      {
        path: 'placesmanagement',  // ceci est relatif à '/administration'
        name: 'placesmanagement',
        component: () => import('../views/admin/PlacesManagement.vue')
      },
      {
        path: 'accommodationsmanagement',  // ceci est relatif à '/administration'
        name: 'accommodationsmanagement',
        component: () => import('../views/admin/AccommodationsManagement.vue')
      },
      {
        path: 'activitiesmanagement',  // ceci est relatif à '/administration'
        name: 'activitiesmanagement',
        component: () => import('../views/admin/ActivitesManagement.vue')
      }],
     /* {
        path: 'charactersmanagement',  // ceci est relatif à '/administration'
        name: 'charactersmanagement',
        component: () => import('../views/admin/PersonnageManagement.vue')
      },
      {
        path: 'reservationsmanagement',  // ceci est relatif à '/administration'
        name: 'reservationsmanagement',
        component: () => import('../views/admin/ReservationManagement.vue')
      },
    ]*/
    },
  ]
})

export default router

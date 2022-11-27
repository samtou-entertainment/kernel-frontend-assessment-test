import { createRouter, createWebHistory } from 'vue-router'

import Contacts from './pages/contacts/Contacts.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Contacts
    },
  ]
})

export default router

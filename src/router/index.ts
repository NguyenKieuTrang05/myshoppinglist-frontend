import { createRouter, createWebHistory } from 'vue-router'

import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CategoryView from '@/views/CategoryView.vue'
import ListView from '@/views/ListView.vue'
import AllListsView from '@/views/AllListsView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import SharedListsView from '@/views/SharedListsView.vue'
import ExpensesView from '@/views/ExpensesView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/category/:categoryName',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/list/:categoryName/:listName',
      name: 'list',
      component: ListView,
    },
    {
      path: '/all-lists',
      name: 'all-lists',
      component: AllListsView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/shared',
      name: 'shared',
      component: SharedListsView,
    },
    {
      path: '/shared/:listName',
      name: 'shared-list',
      component: ListView,
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpensesView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router

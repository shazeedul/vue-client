import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue';

// src/router/index.js
// import store from '../store/index.js';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.isAuthenticated) {
//       next('/login');
//     } else {
//       next();
//     }
    const token = localStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue';
import Form from '../components/Form.vue';
import FormDetails from '../components/FormDetails.vue';

// src/router/index.js
// import store from '../store/index.js';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'dashboard',
      path: '/',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'form',
      path: '/form',
      component: Form,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'formDetails',
      path: '/feedback/:link',
      component: FormDetails,
      meta: {
        requiresAuth: true
      }
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

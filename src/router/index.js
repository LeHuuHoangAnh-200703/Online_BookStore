import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/home/HomePage.vue';
import Details from '../components/home/details.vue';
import Login from '../components/auth/login.vue';
import Logout from '../components/auth/logout.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
      },
    {
        path: '/details',
        name: 'details',
        component: Details
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });

export default router;
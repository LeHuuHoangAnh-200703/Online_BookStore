import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/home/HomePage.vue';
import Details from '../components/home/details.vue';
import Login from '../components/auth/login.vue';
import Logout from '../components/auth/logout.vue';
import BookHistory from '../components/home/Book_history.vue';
import Cart from '../components/home/Cart.vue';
import Profile from '../components/home/Profile.vue';

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
        path: '/book_history',
        name: 'book_history',
        component: BookHistory
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
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
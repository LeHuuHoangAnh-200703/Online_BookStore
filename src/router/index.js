import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/home/HomePage.vue';
import Details from '../components/home/details.vue';
import Login from '../components/auth/login.vue';
import Logout from '../components/auth/logout.vue';
import BookHistory from '../components/home/Book_history.vue';
import Cart from '../components/home/Cart.vue';
import Profile from '../components/home/Profile.vue';
import EditProfile from '../components/home/Edit_profile.vue';
import Order from '../components/home/Orders.vue';
import adminLogin from '../components/auth/adminLogin.vue';
import addAdmin from '../components/auth/addAdmin.vue';
import adminDashboard from '../components/admin/adminDashboard.vue';
import customers from '../components/admin/customers.vue';
import createProducts from '../components/admin/createProducts.vue';

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
        path: '/editprofile',
        name: 'edit_profile',
        component: EditProfile
    },
    {
        path: '/order',
        name: 'order',
        component: Order
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
    },
    {
        path: '/admin/login',
        name: 'adminLogin',
        component: adminLogin
    },
    {
        path: '/admin/addAdmin',
        name: 'addAdmin',
        component: addAdmin
    },
    {
        path: '/admin/adminDashboard',
        name: 'adminDashboard',
        component: adminDashboard
    },
    {
        path: '/admin/customers',
        name: 'customers',
        component: customers
    },
    {
        path: '/admin/createProducts',
        name: 'createProducts',
        component: createProducts
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });

export default router;
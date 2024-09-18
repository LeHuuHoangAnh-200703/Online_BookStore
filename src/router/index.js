import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import Details from '../components/details.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });

export default router;
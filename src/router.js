import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CarListing from './components/CarListing.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/car-listing', component: CarListing },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
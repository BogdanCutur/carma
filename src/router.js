import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CarListing from './components/CarListing.vue';
import LogIn from './components/LogIn.vue';
import SignUp from './components/SignUp.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/car-listing', component: CarListing },
  { path: '/log-in', component: LogIn },
  { path: '/sign-up', component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
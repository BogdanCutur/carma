import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CarListing from './components/CarListing.vue';
import LogIn from './components/LogIn.vue';
import SignUp from './components/SignUp.vue';
import UserCars from './components/UserCars.vue'
import AddCar from './components/AddCar.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/car-listing', component: CarListing },
  { path: '/log-in', component: LogIn },
  { path: '/sign-up', component: SignUp },
  { path: '/user-cars', component: UserCars },
  { path: '/add-car', component: AddCar },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
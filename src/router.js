import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CarListing from './components/CarListing.vue';
import LogIn from './components/LogIn.vue';
import SignUp from './components/SignUp.vue';
import UserCars from './components/UserCars.vue'
import AddCar from './components/AddCar.vue'
import CarDetails from './components/CarDetails.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/car-listing', component: CarListing },
  { path: '/log-in', component: LogIn },
  { path: '/sign-up', component: SignUp },
  { path: '/user-cars', component: UserCars },
  { path: '/add-car', component: AddCar },
  { path: '/car-details/:id', component: CarDetails, name: 'CarDetails', props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

export default router;
<script setup>
  import SingleCar from './SingleCar.vue';
  import { onMounted, ref, computed } from 'vue';
  import { collection, getDocs, query, orderBy } from 'firebase/firestore';
  import { db } from '../firebase.js';

  const cars = ref([]);

  onMounted(async () => {
    try {
      const carCollection = collection(db, 'cars');
      const carQuery = query(carCollection, orderBy('price', 'desc'));
      const carSnapshot = await getDocs(carQuery);

      carSnapshot.forEach((doc) => {
        cars.value.push({ id: doc.id, ...doc.data() });
      });
    } catch (error) {
      console.error('Error fetching cars:', error);
      alert('Error fetching cars: ' + error.message);
    }
  });
  const firstThreeCars = computed(() => cars.value.slice(0, 3));
</script>

<template>
    <div class="image-container">
      <img src="https://car-images.bauersecure.com/wp-images/4176/bugatti_101.jpg" alt="">
      <div class="overlay-content">
        <div class="overlay-text">THE PERFECT DRIVING EXPERIENCE</div>
        <div class="overlay-text-2">Anywhere in the world</div>
        <router-link to="/car-listing" class="overlay-button">Find Your Perfect Vehicle</router-link>
      </div>
    </div>
    <div class="performers">Top Performers</div>
    <div class="car-listings-container">
        <SingleCar 
          v-for="car in firstThreeCars"
          :key="car.id"
          :car="car" />
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.car-listings-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: transparent;
  padding-top: 50px;
}
.image-container {
  position: relative;
  width: 100%;
}
  
img {
  width: 100%;
  height: auto;
}

.performers {
  font-size: 40px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  margin-top: 50px;
}
  
.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Change the color and opacity as needed */
  z-index: 1;
}
  
.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.overlay-text, .overlay-text-2 {
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-size: 48px;
  margin-bottom: 10px;
}

.overlay-button {
  background-color: var(--theme-color);
  text-decoration: none;
  color: white;
  margin-top: 25px;
  padding: 13px 25px;
  border-radius: 20px;
  transition: all 0.3s;
  font-size: 24px;
}

.overlay-button:hover {
  background-color: black;
  cursor: pointer;
}
  </style>
  
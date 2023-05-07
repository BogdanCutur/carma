<script setup>
  import SingleCar from './SingleCar.vue';
  import { onMounted, ref } from 'vue';
  import { collection, getDocs, query, orderBy } from 'firebase/firestore';
  import { db } from '../firebase.js';

  const cars = ref([]);

  onMounted(async () => {
    try {
      const carCollection = collection(db, 'cars');
      const carQuery = query(carCollection, orderBy('title'));
      const carSnapshot = await getDocs(carQuery);

      carSnapshot.forEach((doc) => {
        cars.value.push({ id: doc.id, ...doc.data() });
      });
    } catch (error) {
      console.error('Error fetching cars:', error);
      alert('Error fetching cars: ' + error.message);
    }
  });

    
</script>

<template class="background">
    <div class="background-wrapper">
      <div class="filters-bar">
        <h1 class="filters">Filters</h1>
      </div>
      <div class="car-listings-container">
        <SingleCar 
          v-for="car in cars"
          :key="car.id"
          :car="car" />
      </div>
    </div>
  </template>
  
  <style scoped>
  .filters{
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    padding: 20px;
  }
  .background-wrapper {
    position: relative;
    overflow: hidden;
  }
  
  .background-wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 700px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://cdn.centraljersey.com/wp-content/uploads/sites/26/2023/01/2022-Mazda-3-Sedan.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
  
  .filters-bar {
    width: 50%;
    margin-top: 76px;
    height: 250px;
    background-color: white;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
  
  .car-listings-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: transparent;
    padding-top: 50px;
  }
  </style>
  
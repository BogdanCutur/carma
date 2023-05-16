<script setup>
  import SingleCar from './SingleCar.vue';
  import { onMounted, ref, reactive, watchEffect } from 'vue';
  import { collection, getDocs, query, orderBy, where, getFirestore} from 'firebase/firestore';
  import { db } from '../firebase.js';

  const cars = ref([]);

  const filters = reactive({
        maxPrice: null,
        minSeats: null,
        class: null,
        gearbox: null
  });

  const fetchCars = async () => {
        try {
            let carQuery = collection(db, 'cars');

            if (filters.maxPrice) {
                carQuery = query(carQuery, where('price', '<=', filters.maxPrice));
            }

            if (filters.minSeats) {
                carQuery = query(carQuery, where('seats', '>=', filters.minSeats));
            }

            if (filters.class) {
                carQuery = query(carQuery, where('class', '==', filters.class));
            }

            if (filters.gearbox) {
                carQuery = query(carQuery, where('gearbox', '==', filters.gearbox));
            }

            const carSnapshot = await getDocs(carQuery);

            cars.value = carSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching cars:', error);
            alert('Error fetching cars: ' + error.message);
          }
  };

  const applyFilters = () => {
      fetchCars();
  };

  onMounted(fetchCars);

    
</script>

<template class="background">
    <div class="background-wrapper">
      <div class="filters-bar">
        <h1 class="filters">Filters</h1>
        <form @submit.prevent="applyFilters">
            <div class="form-group">
                <label for="maxPrice">Max Price</label>
                <input type="number" id="maxPrice" v-model="filters.maxPrice" />
            </div>
            <div class="form-group">
                <label for="minSeats">Min Seats</label>
                <input type="number" id="minSeats" v-model="filters.minSeats" />
            </div>
            <div class="form-group">
                <label for="class">Class</label>
                <select id="class" v-model="filters.class">
                    <option value="">All</option>
                    <option value="Economy">Economy</option>
                    <option value="Sports Car">Sports Car</option>
                    <option value="Luxury">Luxury</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gearbox">Gearbox</label>
                <select id="gearbox" v-model="filters.gearbox">
                    <option value="">All</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>
            </div>
            <button class="apply-button" type="submit">Apply Filters</button>
            <p>(Not working perfectly)</p>
        </form>
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
    padding-bottom: 40px;
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

  form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  align-self: center;
}

label {
  margin-top: 15px;
  margin-right: 20px;
  flex-shrink: 0; /* Prevents the label from shrinking */
  width: 140px;
  font-family:'Montserrat', sans-serif;
}

input,
select {
  margin-top: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px; /* Set the width of the input and select elements */
  font-family:'Montserrat', sans-serif;
  box-sizing: border-box;
}

option{
    font-family:'Montserrat', sans-serif;
}

.apply-button {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 20px;
  background-color: var(--theme-color);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: large;
  box-shadow: none;
  border: none;
  margin-top: 20px;
}

.apply-button:hover {
  opacity: 0.8;
}
  </style>
  
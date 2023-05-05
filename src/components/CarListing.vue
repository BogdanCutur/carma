<script setup>
    import SingleCar from './SingleCar.vue';
    import { ref } from 'vue';

    const cars = ref([
    {
        id: 1,
        title: 'BMW 3 Series E90 2.5L',
        imgSrc: "https://info.fcpeuro.com/hubfs/Images/Landing%20pages/BMW/BMW%20E90/Header/E90-Header.jpg",
        class: 'Economy',
        gearbox: 'Manual',
        maxPassengers: 5,
        fuelType: 'Gasoline',
        fuelEconomy: '8l/100km',
        price: 25,
        deposit: 250.00,
        mileage: 'Unlimited',
        features: ["Air Conditioning", "Bluetooth", "GPS", "Heated Seats"],
    },
    {
        id: 2,
        title: 'Mazda Mx-5',
        imgSrc: "https://images.cdn.circlesix.co/image/2/1200/630/5/uploads/posts/2021/05/3ff8712cb810aea6ca9aff9062e0575e.jpeg",
        class: 'Sports Car',
        gearbox: 'Manual',
        maxPassengers: 2,
        fuelType: 'Gasoline',
        fuelEconomy: '7l/100km',
        price: 40,
        deposit: 700.00,
        mileage: 'Unlimited',
        features: ["Leather Seats", "Backup Camera", "Cruise Control"],
    },
    {
        id: 3,
        title: 'FV 4005',
        imgSrc: "https://external-preview.redd.it/dT3GHlavxPH5vSeg4GWhKGKXEZep8ilqTofs_1sCeg4.jpg?auto=webp&s=4a51fba10f70c9b9fc98f5efd2736ace8f508470",
        class: 'Tank Destroyer',
        gearbox: 'Manual',
        maxPassengers: 7,
        fuelType: 'Diesel',
        fuelEconomy: '400l/100km',
        price: 12000,
        deposit: 4000000.00,
        mileage: 'Unlimited',
        features: ["Parking Sensors", "Blind Spot Monitoring", "Remote Start", "Rear Defroster"],

    },
    {
        id: 4,
        title: 'BMW 3 Series E90 2.5L',
        imgSrc: "https://info.fcpeuro.com/hubfs/Images/Landing%20pages/BMW/BMW%20E90/Header/E90-Header.jpg",
        class: 'Economy',
        gearbox: 'Manual',
        maxPassengers: 5,
        fuelType: 'Gasoline',
        fuelEconomy: '8l/100km',
        price: 25,
        deposit: 250.00,
        mileage: 'Unlimited',
        features: ["Air Conditioning", "Bluetooth", "GPS", "Heated Seats"],
    },
]);
</script>

<template class="background">
    <div class="background-wrapper">
      <div class="filters-bar">
        <h1>Filters</h1>
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
  }
  
  .car-listings-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: transparent;
    padding-top: 50px;
  }
  </style>
  
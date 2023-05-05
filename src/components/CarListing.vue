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
    },
]);
</script>

<template>
    <div class="car-listings-container">
    <SingleCar 
    v-for="car in cars"
    :key="car.id"
    :car="car" />
  </div>
</template>

<style scoped>
    .car-listings-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
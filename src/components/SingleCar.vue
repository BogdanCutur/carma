<template>
    <div class="body">
        <img :src="car.imgSrc" alt="">
        <container>
            <h1>{{car.title}}</h1>
            <hr>
            <ul>
                <font-awesome-icon icon="fa-solid fa-car" />
                <p class="bold">Class: </p>
                <p>{{car.class}}</p>
            </ul>
            <ul>
                <font-awesome-icon icon="fa-solid fa-gears" />
                <p class="bold">Gearbox: </p>
                <p>{{car.gearbox}}</p>
            </ul>
            <ul>
                <font-awesome-icon icon="fa-solid fa-people-group" />
                <p class="bold">Max Passangers: </p>
                <p>{{ car.maxPassengers }}</p>
            </ul>
            <ul>
                <font-awesome-icon icon="fa-solid fa-gauge-high" />
                <p class="bold">Fuel: </p>
                <p>{{car.fuelType}}</p>
            </ul>
            <ul>
                <font-awesome-icon icon="fa-solid fa-chart-column" />
                <p class="bold">Fuel Economy: </p>
                <p>{{car.fuelEconomy}}</p>
            </ul>
            <h2 class="features">FEATURES</h2>
            <hr>
            <ul>
                <font-awesome-icon icon="fa-solid fa-plus" @click="toggleDropdown" class="clickable"/>
                <p style="padding-left: 5px" @click="toggleDropdown" class="clickable">{{car.features.length}} Show Everything</p>
            </ul>
            <transition name="slide">
                <div v-show="dropdownVisible" class="features-dropdown">
                    <p v-for="feature in car.features">{{feature}}</p>
                </div>
            </transition>
            <hr>
            <ul class="flex">
                <h2>PRICE FROM</h2>
                <div>
                    <ul class="flex">
                        <h4>{{formatCurrency(car.price)}} </h4>
                        <font-awesome-icon icon="fa-solid fa-euro-sign" size="2x"/>
                    </ul>
                    
                </div>
            </ul>
            <ul class="flex">
                <h3>Deposit:</h3>
                <p>{{formatCurrency(car.deposit)}} <font-awesome-icon icon="fa-solid fa-euro-sign" /></p>
            </ul>
            <ul class="flex">
                <h3>Mileage</h3>
                <p>{{car.mileage}}</p>
            </ul>
                <button>Rent</button>
            
        </container>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    // Importing necessary props for the SingleCar component
    const props = defineProps({
    car: Object,
    });

    let dropdownVisible = ref(false);

  // Function to toggle the visibility of the dropdown list
    const toggleDropdown = () => {
        dropdownVisible.value = !dropdownVisible.value;
    };
    function formatCurrency(value) {
        return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
   
    
  </script>
  
  <style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    .body{
        width: 400px;
        height: min-content;
        padding-bottom: 20px;
        margin: 40px;
        box-shadow: 1px 2px #a7a7a7;
        background-color: rgb(252, 252, 252);
        position: relative;
    }

    img{
        width: 60%;
        height: 120px;
        margin: 20px 80px;
    }

    hr{
        border-top: 1px dotted #000;
        margin: 5px 20px;
    }

    h1{
        font-weight: 500;
        font-size: medium;
        color: var(--theme-color);
        font-family:'Montserrat', sans-serif;
        margin: 5px 20px;
    }
    h1:hover{
        text-decoration: underline;
    }
    container > ul{
        display: flex;
        padding: 0;
        margin-left: 20px;
    }

    p{
        margin: 0;
        font-family:'Montserrat', sans-serif;
    }
    .bold{
        font-weight: 700;
        margin: 0px 8px;
    }
    .flex{
        display: flex;
        align-items: center;
        padding: 0;
        justify-content: space-between;
        margin: 0px 20px;
        max-height: 60px;
    }

    h2{
        font-family:'Montserrat', sans-serif;
        font-size: large;
        font-weight: 400;
    }
    .features{
        margin-left: 20px;
    }

    h4{
        font-family:'Montserrat', sans-serif;
        font-size: 30px;
        padding-right: 5px;
    }

    button{
        background-color:  var(--theme-color);
        border-radius: 10px;
        width: 90%;
        height: 50px;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-weight: 600;
        font-size: 20px;
        border-color: rgb(211, 211, 211);
        margin-left: 20px;
    }

    button:hover{
        opacity: 80%;
    }

    .clickable, button {
        cursor: pointer;
    }

    .features-dropdown {
    padding: 10px 20px;
    text-align: left;
  }

  .features-dropdown p {
    margin: 5px 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
  }


  </style>
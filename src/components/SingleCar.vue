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
                <font-awesome-icon icon="fa-solid fa-plus" />
                <p style="padding-left: 5px">8 Show Everything</p>
            </ul>
            <hr>
            <ul class="flex">
                <h2>PRICE FROM</h2>
                <div>
                    <ul class="flex">
                        <h4>{{car.price}} </h4>
                        <font-awesome-icon icon="fa-solid fa-euro-sign" size="2x"/>
                    </ul>
                    
                </div>
            </ul>
            <ul class="flex">
                <h3>Deposit:</h3>
                <p>{{car.deposit}}</p>
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
    // Importing necessary props for the SingleCar component
    const props = defineProps({
    car: Object,
});
  </script>
  
  <style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    .body{
        width: 400px;
        height: auto;
        padding-bottom: 20px;
        margin: 40px;
        box-shadow: 1px 2px #a7a7a7;
        background-color: rgb(252, 252, 252);
        position: relative;
        min-height: calc(100vh - 100px);
    }

    img{
        max-width: 60%;
        margin: 20px 80px;
    }

    hr{
        border-top: 1px dotted #000;
        margin: 5px 20px;
    }

    h1{
        font-weight: 500;
        font-size: medium;
        color: rgb(252, 120, 6);
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
        background-color:  rgb(252, 120, 6);
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
  </style>
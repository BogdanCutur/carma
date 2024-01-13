<template>
    <div class="body">
        <img :src="car.imgSrc" alt="">
        <container>
            <h1>{{car.title}}</h1>
            <hr>
            <div class="rating">
                <template v-for="i in 5">
                    <font-awesome-icon v-if="i <= fullStars" icon="fa-solid fa-star" class="full-star" :key="'full-' + i" />
                    <font-awesome-icon v-else icon="fa-regular fa-star" class="hollow-star" :key="'hollow-' + i" />
                </template>
            </div>
            <div class="reviews" v-if="car.reviews.length == 1">{{ car.reviews.length }} Review</div>
            <div class="reviews" v-else>{{ car.reviews.length }} Reviews</div>
            <hr>
            <ul v-if="!isCarOwner">
                <font-awesome-icon icon="fa-brands fa-whatsapp" />
                <p class="bold">Owner: </p>
                <p>{{car.userFirstName}}</p>
            </ul>
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
                <p>{{car.fuelEconomy}}l/100km</p>
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
            <router-link v-if="!userLoggedIn"
                to="/log-in"
                class="choose-button"
                >
            Choose
            </router-link>

            <router-link v-else-if="!isCarOwner"
                :to="{ name: 'CarDetails', params: { id: car.id }}"
                class="choose-button"
                >
            Choose
            </router-link>

            <!-- <router-link v-else
                :to="{ name: 'CarDetails', params: { id: car.id }}"
                class="choose-button"
                >
            Modify
            </router-link>
            <p v-if="isCarOwner" style="margin-left: 60px;">(Doesn't point where it should yet)</p> -->
            
        </container>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { computed } from 'vue';
    import { useAuthStore } from '../store/auth';
    
    const averageRating = computed(() => {
        if (props.car.reviews.length === 0) return 0;

        const sum = props.car.reviews.reduce((a, b) => a + b);
        return Math.round(sum / (props.car.reviews.length * 2));
    });

    const fullStars = computed(() => averageRating.value);

    // Importing necessary props for the SingleCar component
    const props = defineProps({
        car: Object,
    });

    const authStore = useAuthStore();
    const userId = authStore.user ? authStore.user.uid : null;

    let isCarOwner = computed(() => userId && props.car.userId === userId);

    let userLoggedIn = computed(() => userId != null)

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
        padding-bottom: 40px;
        margin: 20px 40px;
        margin-bottom: 60px;
        box-shadow: 1px 2px #a7a7a7;
        background-color: rgb(252, 252, 252);
        position: relative;
    }

    img{
        width: 60%;
        height: 120px;
        margin: 80px;
        margin-bottom: 0px;
        margin-top: 40px; 
    }

    hr{
        border-top: 1px dotted #000;
        margin: 5px 20px;
    }

    h1{
        font-weight: 700;
        font-size: large;
        color: var(--theme-color);
        font-family:'Montserrat', sans-serif;
        text-align: center;
        margin-bottom: 20px;
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

    .choose-button {
  display: inline-block;
  background-color: var(--theme-color);
  border-radius: 10px;
  width: 90%;
  height: 50px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: 600;
  font-size: 20px;
  border-color: rgb(211, 211, 211);
  margin-left: 20px;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
}

.choose-button:hover {
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

  .rating {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.full-star, .hollow-star {
  color: var(--theme-color);
  margin-right: 3px;
}

.reviews{
    text-align: center;
    font-family: 'Montserrat', sans-serif;

}


  </style>
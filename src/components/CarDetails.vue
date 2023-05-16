<template>
    <div v-if="car" class="details-page">
      <ul class="inline">
        <div class="product-container">
          <h1>{{car.title}}</h1>
          <img :src="car.imgSrc" alt="">
        </div>
        <div class="purchase-container">
          <h2>Details</h2>

          <ul>
            <p2>Class:</p2>
            <p>{{ car.class }}</p>
          </ul>
          <ul>
            <p2>Gearbox:</p2>
            <p>{{ car.gearbox }}</p>
          </ul>
          <ul>
            <p2>Max Passengers:</p2>
            <p>{{ car.maxPassengers }}</p>
          </ul>
          <ul>
            <p2>Fuel Type:</p2>
            <p>{{ car.fuelType }}</p>
          </ul>
          <ul>
            <p2>Fuel Economy:</p2>
            <p>{{ car.fuelEconomy }}</p>
          </ul>
          <ul>
            <p2>Price per day:</p2>
            <p>{{ car.price }}  <font-awesome-icon icon="fa-solid fa-euro-sign" /></p>
          </ul>

          <form>
            <label for="days">Number of days:</label>
            <input type="number" id="days" v-model.number="days" min="1" required>
          </form>

          <ul>
            <p2 class="large">Car payment:</p2>
            <p class="large">{{ totalPrice }}  <font-awesome-icon icon="fa-solid fa-euro-sign" /></p>
          </ul>
          <ul>
            <p2 class="large">Deposit:</p2>
            <p class="large">{{ car.deposit }}  <font-awesome-icon icon="fa-solid fa-euro-sign" /></p>
          </ul>
          <ul>
            <p2 class="large">Service Fee:</p2>
            <p class="large">{{ fee }}  <font-awesome-icon icon="fa-solid fa-euro-sign" /></p>
          </ul>
          <ul>
            <p2 class="large">Total Price:</p2>
            <p class="large">{{ totalPrice + fee }}  <font-awesome-icon icon="fa-solid fa-euro-sign" /></p>
          </ul>
          <ul>
            <p2 class="large">Total to have available:</p2>
            <p class="large">{{ totalPrice + fee + car.deposit}}  <font-awesome-icon icon="fa-solid fa-euro-sign" /></p>
          </ul>
          <button @click="purchase">Purchase</button>
          <p :class="{ error: statusMessage.includes('Not'), success: statusMessage.includes('successful') }">{{ statusMessage }}</p>
        </div>
      </ul>
      
    </div>

</template>
  
<script>
import { onMounted, ref, computed } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useRoute } from 'vue-router';
import { getAuth } from "firebase/auth";


export default {
  setup() {
    const car = ref(null);
    const route = useRoute();

    const days = ref(1);
    const statusMessage = ref('');

    const showModal = ref(false);
    const carRating = ref(null);
    const userRating = ref(null);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    onMounted(async () => {
      try {
        const carRef = doc(db, 'cars', route.params.id);
        const carSnapshot = await getDoc(carRef);

        if (carSnapshot.exists()) {
          car.value = { id: carSnapshot.id, ...carSnapshot.data() };
          console.log("Fetched car:", car.value);
        } else {
          console.error('Car not found');
          throw new Error("Car not found");
        }
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    });

    const totalPrice = computed(() => {
      if (car.value) {
        return car.value.price * days.value;
      }
      return 0;
    });

    const fee = computed(() =>{
      if (!isNaN(totalPrice.value)) {
        return totalPrice.value * 0.02;
      }
      return 0;
    });

    const purchase = async () => {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          console.error('User not found');
          statusMessage.value = 'User not found.';
          return;
        }

        const user = userSnapshot.data();

        if (user.balance < totalPrice.value + fee.value + car.value.deposit) {
          console.error('Not enough balance');
          statusMessage.value = 'Not enough money for this purchase.';
          return;
        }

        // Start transaction
        await updateDoc(userRef, {
          balance: user.balance - (totalPrice.value + fee.value),
          totalPurchases: user.totalPurchases + (totalPrice.value + fee.value),
        });

        const carOwnerRef = doc(db, 'users', car.value.userId);
        const carOwnerSnapshot = await getDoc(carOwnerRef);

        if (!carOwnerSnapshot.exists()) {
          console.error('Car owner not found');
          statusMessage.value = 'Car owner not found.';
          return;
        }

        const carOwner = carOwnerSnapshot.data();

        await updateDoc(carOwnerRef, {
          balance: carOwner.balance + totalPrice.value,
          totalSales: carOwner.totalSales + totalPrice.value,
        });

        console.log('Transaction successful');
        statusMessage.value = 'Transaction successful.';
      } catch (error) {
        console.error('Error during transaction:', error);
        statusMessage.value = 'Error during transaction.';
      }
    };

    return { car, days, totalPrice, fee, purchase, statusMessage };
  },
};
</script>

<style scoped>
  p{
    margin: 0;
    margin-left: 20px;
    font-family:'Montserrat', sans-serif;
    font-weight: 600;
    font-size: large;
  }

  p2{
    font-size: large;
  }

  .large{
    font-size: 25px;
  }

  ul{
    display: flex;
    padding: 0;
    margin-left: 20px;
  }
  .inline{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img{
    width: 80%;
  }

  .details-page{
    width: 100%;
    height: 100%;
  }

  .product-container {
    background-color: white;
    border-radius: 20px;
    width: 60%;
    text-align: center;
    padding-bottom: 20px;
  }

  .purchase-container {
    background-color: white;
    border-radius: 20px;
    width: 32%;
    margin-right: 20px;
    text-align: center;
    padding-bottom: 20px;
  }

  input{
    font-family:'Montserrat', sans-serif;
    margin-left: 20px;
  }

  button{
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

  button:hover{
    opacity: 0.8;
  }

  .error{
    color: rgb(159, 2, 2);
    margin: 20px;
  }

  .success{
    color: green;
    margin: 20px;
  }
</style>
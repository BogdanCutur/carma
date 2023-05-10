<template>
    <div v-if="car" class="details-page">
      <ul class="inline">
        <div class="product-container">
          <h1>{{car.title}}</h1>
          <img :src="car.imgSrc" alt="">
          <ul>
              <font-awesome-icon icon="fa-brands fa-whatsapp" />
              <p class="bold">Owner: </p>
              <p>{{car.userFirstName}}</p>
          </ul>
        </div>
        <div class="purchase-container">
          <p>{{ car.price }}</p>
        </div>
      </ul>
      
    </div>
</template>
  
<script>
import { onMounted, ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const car = ref(null);
    const route = useRoute();

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

    return { car };
  },
};
</script>

<style scoped>
  p{
    margin: 0;
    margin-left: 20px;
    font-family:'Montserrat', sans-serif;
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
    width: 63%;
  }

  .purchase-container {
    background-color: white;
    border-radius: 20px;
    width: 32%;
  }
</style>
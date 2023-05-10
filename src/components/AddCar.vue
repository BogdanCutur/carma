<template>
    <div class="login-page">
      <div class="login-bg"></div>
      <div class="login-container">
        <h1>Add your vehicle</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="formData.title" required />
            </div>
            <div class="form-group">
                <label for="imgSrc">Image URL</label>
                <input type="text" id="imgSrc" v-model="formData.imgSrc" required />
            </div>
            <div class="form-group">
                <label for="class">Class</label>
                <select id="class" v-model="formData.class" required>
                    <option value="Economy">Economy</option>
                    <option value="Sports Car">Sports Car</option>
                    <option value="Luxury">Luxury</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gearbox">Gearbox</label>
                <select id="gearbox" v-model="formData.gearbox" required>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>
            </div>
            <div class="form-group">
                <label for="maxPassengers">Max Passengers</label>
                <input type="number" id="maxPassengers" v-model="formData.maxPassengers" required />
            </div>
            <div class="form-group">
                <label for="fuelType">Fuel Type</label>
                <select id="fuelType" v-model="formData.fuelType" required>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                </select>
            </div>
            <div class="form-group">
                <label for="fuelEconomy">Fuel Economy (L/100km)</label>
                <input type="number" id="fuelEconomy" v-model="formData.fuelEconomy" required />
            </div>
            <div class="form-group">
                <label for="price">Price (€/day)</label>
                <input type="number" id="price" v-model="formData.price" required />
            </div>
            <div class="form-group">
                <label for="deposit">Deposit (€)</label>
                <input type="number" id="deposit" v-model="formData.deposit" required />
            </div>
            <div class="form-group">
                <label for="mileage">Mileage</label>
                <input type="text" id="mileage" v-model="formData.mileage" required />
            </div>
            <div>
                <div class="features-title">
                    <label>Features</label>
                </div>
                <div>
                    <div v-for="feature in availableFeatures" :key="feature">
                    <input
                        type="checkbox"
                        :id="feature"
                        :value="feature"
                        v-model="formData.features"
                    />
                    <label :for="feature">{{ feature }}</label>
                    </div>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </template>

<script>
import { useAuthStore } from "../store/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase.js";
export default {
    setup() {
        const authStore = useAuthStore();
        const user = authStore.user;

        return {
            user,
        };
    },
  data() {
    return {
      formData: {
        title: '',
        imgSrc: '',
        class: '',
        gearbox: '',
        maxPassengers: '',
        fuelType: '',
        fuelEconomy: '',
        price: '',
        deposit: '',
        mileage: '',
        features: [],
        reviews: [],
        userFirstName: '',
      },
      availableFeatures: ["Air Conditioning", "Bluetooth", "Android Auto", "Heated Seats", "Xenon Lights", "Radio", "CD Player", "Turbocharger", "Sunroof", "Cooled Seats", "Autopilot"],
      nextId: 1,
    };
  },
  methods: {
    async submitForm() {
        const carWithUserId = { ...this.formData, userId: this.user.uid, userFirstName: this.user.firstName };
        try{
            const docRef = await addDoc(collection(db, "cars"), carWithUserId);
            console.log("Car saved with ID: ", docRef.id);
            this.$router.push("/user-cars");
        }catch(error){
            console.error("Error saving car: ", error);
        }

        console.log(this.formData);
        this.resetForm();
    },
    resetForm() {
        this.formData.title = '';
        this.formData.imgSrc = '';
        this.formData.class = '';
        this.formData.gearbox = '';
        this.formData.maxPassengers = '';
        this.formData.fuelType = '';
        this.formData.fuelEconomy = '';
        this.formData.price = '';
        this.formData.deposit = '';
        this.formData.mileage = '';
        this.formData.features = [];
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
h1{
    font-weight: 700;
    font-size: 30px;
    font-family:'Montserrat', sans-serif;
    text-align: center;
    margin-bottom: 20px;
}
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.netdirector.co.uk/gforces-auto/image/upload/q_auto,c_fill,f_auto,fl_lossy,w_1920,h_1080/auto-client/a192da271a0306eb17223fce64e55369/microsoftteams_image.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: brightness(60%);
}

.login-container {
  max-width: 500px;
  min-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 20px;
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
  align-items: center;
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
  width: 140px; /* Set the width of the input and select elements */
  font-family:'Montserrat', sans-serif;
  box-sizing: border-box;
}

option{
    font-family:'Montserrat', sans-serif;
}

button[type="submit"] {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--theme-color);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

button[type="submit"]:hover {
  background-color: black;
}

.features-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Add some margin to the top */
}

.features-title label {
  font-size: 22px; /* Make the font size bigger */
  margin-top: 0; /* Remove the top margin */
  padding: 8px; /* Add some padding around the label */
}
</style>
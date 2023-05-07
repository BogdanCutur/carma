<template>
    <div class="login-page">
      <div class="login-bg"></div>
      <div class="login-container">
        <h2>Add your vehicle</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="title">Title</label>
                <input type="text" id="title" v-model="formData.title" required />
            </div>
            <div>
                <label for="imgSrc">Image URL</label>
                <input type="text" id="imgSrc" v-model="formData.imgSrc" required />
            </div>
            <div>
                <label for="class">Class</label>
                <select id="class" v-model="formData.class" required>
                <option value="Economy">Economy</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Luxury">Luxury</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                </select>
            </div>
            <div>
                <label for="gearbox">Gearbox</label>
                <select id="gearbox" v-model="formData.gearbox" required>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                </select>
            </div>
            <div>
                <label for="maxPassengers">Max Passengers</label>
                <input type="number" id="maxPassengers" v-model="formData.maxPassengers" required />
            </div>
            <div>
                <label for="fuelType">Fuel Type</label>
                <select id="fuelType" v-model="formData.fuelType" required>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                </select>
            </div>
            <div>
                <label for="fuelEconomy">Fuel Economy (L/100km)</label>
                <input type="number" id="fuelEconomy" v-model="formData.fuelEconomy" required />
            </div>
            <div>
                <label for="price">Price (€/day)</label>
                <input type="number" id="price" v-model="formData.price" required />
            </div>
            <div>
                <label for="deposit">Deposit (€)</label>
                <input type="number" id="deposit" v-model="formData.deposit" required />
            </div>
            <div>
                <label for="mileage">Mileage</label>
                <input type="text" id="mileage" v-model="formData.mileage" required />
            </div>
            <div>
            <label>Features</label>
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
        id: null,
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
      },
      availableFeatures: ["Air Conditioning", "Bluetooth", "GPS", "Heated Seats"],
      nextId: 1,
    };
  },
  methods: {
    async submitForm() {
        this.formData.id = this.nextId;
        this.nextId += 1;
        const carWithUserId = { ...this.formData, userId: this.user.uid };
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

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 76px);
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
  max-width: 400px;
  min-width: 280px;
  padding: 90px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

label {
  font-weight: bold;
  margin-top: 10px;
}

input,
select {
  margin-top: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

select {
  width: 100%;
}

button[type="submit"] {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--theme-color);
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

button[type="submit"]:hover {
  background-color: black;
}
</style>
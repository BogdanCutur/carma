<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import { firebaseApp } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthStore } from './store/auth'; // Adjust the path to your store

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);

onMounted(() => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userDetails = userDoc.data();
        authStore.setUser(userDetails);
      } else {
        console.log("User data not found in database");
      }
    } else {
      authStore.setUser(null);
      if (router.currentRoute.value.path !== '/log-in') {
        router.push("/log-in");
      }
    }

    isLoading.value = false;
  });
});
</script>

<template>
  <div id="app-container">
    <Header/>
    <router-view class="main-content"/>
    <Footer/>
  </div>
</template>

<style>
  body{
    font-family: 'Montserrat', sans-serif;
  }

  :root {
    --theme-color: rgb(228, 118, 16);
  }

  #app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex-grow: 1;
    margin-top: 76px;
  }
</style>

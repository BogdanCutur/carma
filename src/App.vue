<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue' 
import Footer from './components/Footer.vue'
import CarListing from './components/CarListing.vue';
</script>

<template>
  <Header/>
  <CarListing/>
  <Footer/>
</template>

<style scoped>
  
</style>

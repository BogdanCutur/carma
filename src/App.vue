<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue' 
import Footer from './components/Footer.vue'
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

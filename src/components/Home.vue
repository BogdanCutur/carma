<template>
    <div class="image-container">
      <img src="https://www.bugatti.com/fileadmin/_processed_/sei/p1/se-image-d37f5243f6ae21dcfb1fbf28dfe261f5.jpg" alt="">
      <div class="overlay-text">THE PERFECT DRIVING EXPERIENCE</div>
      <div class="overlay-text-2">Anywhere in the world</div>
      <router-link to="/car-listing" class="overlay-button">Find Your Perfect Vehicle</router-link>
    </div>
    <h1>aaaaaaa</h1>
    <h1>aaaaaaa</h1>
    <h1>aaaaaaa</h1>
</template>

  <style scoped>
    .image-container {
      position: relative;
      width: 100%;
    }
  
    img {
      width: 100%;
      height: auto;
    }
  
    .image-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6); /* Change the color and opacity as needed */
      z-index: 1;
    }
  
    .overlay-text, .overlay-text-2, .overlay-button {
    position: absolute;
    left: 50%;
    color: white;
    font-size: 48px;
    z-index: 2;
  }

  .overlay-text {
    top: 40%; /* Adjust the value to position the first text line vertically */
    transform: translateX(-50%);
  }

  .overlay-text-2 {
    top: 50%; /* Adjust the value to position the second text line vertically */
    transform: translateX(-50%);
  }

  .overlay-button {
    top: 63%; /* Adjust the value to position the second text line vertically */
    transform: translateX(-50%);
    background-color: var(--theme-color);
    text-decoration: none;
    padding: 13px 25px;
    border-radius: 20px;
    transition: all 0.3s;
    font-size: 24px
  }

  .overlay-button:hover{
    background-color: black;
    cursor: pointer;
  }
  </style>
  
<script setup>
  
</script>

<template>
  <nav class="blackNav">
    <ul class="blackNavList">
      <ul>
        <li>
          <font-awesome-icon icon="fa-solid fa-phone" inverse/>
          <a href="#">+0722 555 060</a>
        </li>
        <li>
          <font-awesome-icon icon="fa-solid fa-envelope" inverse/>
          <a href="#">contact@carma.com</a>
        </li>
        <li>
          <font-awesome-icon icon="fa-regular fa-calendar-check" inverse/>
          <a href="#" class="whiteA">NON STOP</a>
        </li>
        <li>
          <font-awesome-icon icon="fa-solid fa-language" inverse/>
          <a href="#">EN</a>
          <a href="#">RO</a>
        </li>
      </ul>
      <ul>
        <li class="auth-buttons">
          <a href="#" class="sign-in">Sign In</a>
          <a href="#" class="sign-up">Sign Up</a>
        </li>
      </ul>
    </ul>
  </nav>


  <nav class="secondNav">
    <ul class="greyNavList">
      <li>
        <img src="https://cdn.pixabay.com/photo/2016/01/17/21/38/bmw-1145611_960_720.png" alt="">
      </li>
      <li>
        <ul>
          <li><router-link to="/" class="greyA">Home</router-link></li>
          <li><router-link to="/car-listing" class="greyA">Our Cars</router-link></li>
          <li><a href="#" class="greyA">Extras List</a></li>
          <li><a href="#" class="greyA">About Us</a></li>
        </ul>
      </li>
      
    </ul>
  </nav>


</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  a{
    margin-left: 7px;
    color: var(--theme-color);
    text-decoration: none;
  }

  a:hover{
    color: gainsboro;
  }

  .whiteA{
    color: white;
  }

  .greyA{
    color: gray;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    font-size: large;
  }
  .greyA:hover{
    color: var(--theme-color)
  }

  .blackNav{
    background-color: black;
    justify-content: center;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    height: 76px;
  }

  .blackNav .auth-buttons {
  display: flex;
}

.blackNav .sign-in,
.blackNav .sign-up {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}

.blackNav .sign-in {
  background-color: var(--theme-color); /* Replace with your theme color */
  color: white;
}

.blackNav .sign-up {
  background-color: white;
  color: black;
}

.blackNav .sign-in:hover,
.blackNav .sign-up:hover {
  opacity: 0.8;
}

  .blackNav > ul{
    width: 1300px;
  }

  ul > li {
    display: inline-block;
    padding: 20px;
}

  ul{
    margin: 0;
  }

  img{
    width: 200px;
    height: auto;
  }

  .greyNavList{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1300px;
    padding-top: 76px;
  }
  .blackNavList{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1300px;
  }

  .secondNav{
    display: flex;
    justify-content: center;
    box-shadow: 1px 2px #a7a7a7;
    background-color: rgb(252, 252, 252);
  }
</style>
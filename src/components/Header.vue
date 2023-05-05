<script setup>
  
</script>

<template>
  <nav class="blackNav">
    <ul>
      <li>
        <font-awesome-icon icon="fa-solid fa-phone" inverse/>
        <a href="#">+0722 955 060</a>
      </li>
      <li>
        <font-awesome-icon icon="fa-brands fa-whatsapp" inverse/>
        <a href="#">Whatsapp</a>
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
  </nav>


  <nav class="secondNav">
    <ul class="greyNavList">
      <li>
        <img src="https://cdn.pixabay.com/photo/2016/01/17/21/38/bmw-1145611_960_720.png" alt="">
      </li>
      <li>
        <ul>
          <li><a href="#" class="greyA">Modify Reservation</a></li>
          <li><a href="#" class="greyA">Our Cars</a></li>
          <li><a href="#" class="greyA">Extras List</a></li>
          <li><a href="#" class="greyA">About Us</a></li>
          <li>
            <font-awesome-icon icon="fa-solid fa-flag-usa" />
            <a href="#" class="greyA">English</a>
          </li>
        </ul>
      </li>
      
    </ul>
  </nav>


</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  a{
    margin-left: 7px;
    color: rgb(252, 120, 6);
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
    color: rgb(252, 120, 6)
  }

  .blackNav{
    background-color: black;
    justify-content: center;
    display: flex;
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
  }

  .secondNav{
    display: flex;
    justify-content: center;
  }
</style>
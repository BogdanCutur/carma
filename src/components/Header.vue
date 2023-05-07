<script>
  import { useAuthStore } from '../store/auth';
  import { getAuth, signOut } from 'firebase/auth';


  export default {
    computed: {
      user() {
        return useAuthStore().user;
      },
    },
    data() {
      return {
        dropdownVisible: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      async logOut() {
        try {
          const auth = getAuth();
          await signOut(auth);
          useAuthStore().setUser(null);
          this.$router.push('/');
        } catch (error) {
          console.error('Error logging out:', error);
          alert('Error logging out: ' + error.message);
        }
      },
    },
  };
</script>

<template>
  <nav class="blackNav">
    <ul class="blackNavList">
      <ul>
        <li>
          <ul>
            <li><router-link to="/" class="greyA">Home</router-link></li>
            <li><router-link to="/car-listing" class="greyA">Our Selection</router-link></li>
            <li><a href="#" class="greyA">About Us</a></li>
            <li v-if="user"><router-link to="/user-cars" class="greyA">My Vehicles</router-link></li>
          </ul>
       </li>
      </ul>
      <ul>
        <router-link to="/add-car" class="sign-in" v-if="user">Add Vehicle</router-link>
        <li class="auth-buttons" v-if="!user">
          <router-link to="/log-in" class="sign-in">Log In</router-link>
          <router-link to="/sign-up" class="sign-up">Sign Up</router-link>
        </li>
        <li v-else @click="toggleDropdown" class="user-dropdown">
          Hello, {{ user.firstName }}
          <ul v-if="dropdownVisible" class="dropdown-menu">
            <li class="black">My Account</li>
            <li @click="logOut" class="black">Log Out</li>
          </ul>
        </li>
      </ul>
      
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
  font-family: 'Montserrat', sans-serif;
  margin-left: 15px;
}

.blackNav .sign-in {
  background-color: var(--theme-color);
  border-radius: 20px;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.blackNav .sign-up {
  background-color: white;
  border-radius: 20px;
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

  .blackNavList{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1300px;
  }

  .user-dropdown {
    position: relative;
    cursor: pointer;
    color: white;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    font-size: large;
    margin-left: 20px;
  }

  .user-dropdown:hover{
    color: var(--theme-color);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    display: block;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }

  .dropdown-menu li {
    padding: 3px 20px;
    white-space: nowrap;
  }

  .dropdown-menu li:hover {
    background-color: #f5f5f5;
  }

  .black{
    color: black;
  }

</style>
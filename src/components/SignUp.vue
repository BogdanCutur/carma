<template>
    <div class="login-page">
      <div class="login-bg"></div>
      <div class="login-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
            <div class="input-group">
                <label for="First Name">First Name:</label>
                <input type="text" id="first-name" v-model="firstName" required />
            </div>
            <div class="input-group">
                <label for="Last Name">Last Name:</label>
                <input type="text" id="last-name" v-model="lastName" required />
            </div>
            <div class="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="input-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
          <button type="submit">Sign up</button>
        </form>
        <router-link to="/log-in" class="sign-in">Already a user? Log In.</router-link>
      </div>
    </div>
  </template>
  
  <script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { getDatabase, ref, set } from "firebase/database";
    import { firebaseApp } from "../firebase.js";
    import { saveUser } from '../user.js';
    
    export default {
        data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
        },
        methods: {
        async submitForm() {
            try {
                const auth = getAuth(firebaseApp);
                const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
                const userId = userCredential.user.uid;
        
                const database = getDatabase(firebaseApp);
                await set(ref(database, "users/" + userId), {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email
                });
                const user = {
                  uid: userId,
                  email: this.email,
                  firstName: this.firstName,
                  lastName: this.lastName,
                };

                await saveUser(user);
                this.$nextTick(() => {
                    this.$router.push("/log-in");
                });
            } catch (error) {
                console.error("Error creating user:", error);
                alert("Error creating user: " + error.message);
                }
            }
        }
    };
    
  </script>
  
    
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  .sign-in{
    text-decoration: none;
    color: var(--theme-color);
    padding-top: 25px;
    padding-left: 20px;
    font-family: 'Montserrat', sans-serif;
  }

  form{
    padding: 20px;
  }

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
    background-image: url('https://www.topgear.com/sites/default/files/2022/06/1-Audi-RS6.jpg');
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
    border-radius: 20px;
    }
  
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
  
  .input-group {
    margin-bottom: 20px;
    font-family: 'Montserrat', sans-serif;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-family: 'Montserrat', sans-serif;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
  
  button {
    width: 100%;
    padding: 8px;
    background-color: var(--theme-color);
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    border-radius: 20px;
  }
  
  button:hover {
    background-color: black;
  }
  </style>
  
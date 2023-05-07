<template>
    <div class="login-page">
      <div class="login-bg"></div>
      <div class="login-container">
        <h2>Log In</h2>
        <form @submit.prevent="submitForm">
          
          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Log in</button>
        </form>
        <router-link to="/sign-up" class="log-in">Not a user? Sign up.</router-link>
      </div>
    </div>
  </template>
  
  <script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useAuthStore } from '../store/auth';
    import { getDatabase, ref, get } from "firebase/database";
    import { firebaseApp } from "../firebase.js";

    export default {
      data() {
        return {
          email: "",
          password: ""
        };
      },
      methods: {
        async submitForm() {
          try {
            const auth = getAuth(firebaseApp);
            await signInWithEmailAndPassword(auth, this.email, this.password);

            const database = getDatabase(firebaseApp);
            const userId = auth.currentUser.uid;
            const userSnapshot = await get(ref(database, "users/" + userId));
            const userFirstName = userSnapshot.val().firstName;

            const authStore = useAuthStore();
            authStore.setUser({
              uid: userId,
              firstName: userFirstName,
            });

            this.$router.push("/"); // Navigate to the desired page after successful login
          } catch (error) {
            console.error("Error logging in:", error);
            alert("Error logging in: " + error.message);
          }
        }
      }
    };

  </script>
  
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.log-in{
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
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 8px;
    background-color: var(--theme-color);
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    font-size: 18px;
  }
  
  button:hover {
    background-color: black;
  }
  </style>
  
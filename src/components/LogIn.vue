<template>
    <div class="login-page">
      <div class="login-bg"></div>
      <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
          
          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <router-link to="/sign-up" class="log-in">Not a user? Sign up.</router-link>
      </div>
    </div>
  </template>
  
  <script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { initializeApp } from "firebase/app";
    import { useAuthStore } from '../store/auth';
    import { getDatabase, ref, get } from "firebase/database";

    const firebaseConfig = {
      apiKey: "AIzaSyCdBRho0rLWwJ9Q78vCi5ox5IxaaiuDmNE",
      authDomain: "carma-7dce2.firebaseapp.com",
      projectId: "carma-7dce2",
      databaseURL: "https://carma-7dce2-default-rtdb.europe-west1.firebasedatabase.app/",
      storageBucket: "carma-7dce2.appspot.com",
      messagingSenderId: "299286293377",
      appId: "1:299286293377:web:16ddae7d081a4a38a9d680",
      measurementId: "G-0SM7W14R9W"
    };

    const firebaseApp = initializeApp(firebaseConfig);

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
  .log-in{
        text-decoration: none;
        color: var(--theme-color);
        padding-top: 25px;
        padding-left: 20px;
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
}
  
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 8px;
    background-color: var(--theme-color);
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: var(--theme-color);
  }
  </style>
  
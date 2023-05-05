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
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      submitForm() {
        console.log("Email:", this.email, "Password:", this.password);
        // Handle form submission, e.g., authentication, navigation, etc.
      },
    },
  };
  </script>
  
  <style scoped>
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
  padding: 100px 50px;
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
    background-color: #3498db;
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  
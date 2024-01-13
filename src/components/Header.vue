<script>
  import { useAuthStore } from '../store/auth';
  import { getAuth, signOut } from 'firebase/auth';
  import { doc, updateDoc, getFirestore } from 'firebase/firestore';

  export default {
    computed: {
      user() {
        console.log(useAuthStore().user);
        return useAuthStore().user;
      },
      profilePictureUrl() {
        if (this.user && this.user.profilePicture !== '') {
          return this.user.profilePicture;
        } else {
          return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
        }
      },
      userRating(){
        if(!this.user) return 0;
        if (this.user.userReviews.length === 0) return 0;

        const sum = this.user.userReviews?.reduce((a, b) => a + b, 0);
        return Math.round(sum / (this.user.userReviews.length * 2));
      },
    },
    data() {
      return {
        dropdownVisible: false,
        addMoney: false,
        changeProfilePic: false,
        amountToAdd: 0,
        pictureURL: '',
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
        if (this.dropdownVisible) {
          this.$nextTick(() => {
            // Delay the addition of the event listener
            setTimeout(() => {
              window.addEventListener('click', this.hideDropdownIfClickedOutside);
            }, 0);
          });
        } else {
          window.removeEventListener('click', this.hideDropdownIfClickedOutside);
        }
      },
      hideDropdownIfClickedOutside(event) {
        const userMenuElement = this.$refs.userMenu;
        if (userMenuElement && !userMenuElement.contains(event.target)) {
          this.dropdownVisible = false;
          window.removeEventListener('click', this.hideDropdownIfClickedOutside);
        }
      },
      toggleMoney() {
        this.addMoney = !this.addMoney;
        this.changeProfilePic = false;
      },
      toggleProfilePicture() {
        this.changeProfilePic = !this.changeProfilePic;
        this.addMoney = false;
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
      async confirmPayment() {
        if (this.amountToAdd > 0) {
          const db = getFirestore();
          const userRef = doc(db, 'users', this.user.uid);
          await updateDoc(userRef, {
            balance: this.user.balance + this.amountToAdd
          });
          this.toggleMoney();
          this.amountToAdd = 0;
          const authStore = useAuthStore();
          await authStore.refreshUser(this.user.uid);
          this.componentKey++;

        } else {
          alert('Please enter a valid amount.');
        }
      },
      async updateProfilePicture() {
        if (this.pictureURL !== '') {
          const db = getFirestore();
          const userRef = doc(db, 'users', this.user.uid);
          await updateDoc(userRef, {
            profilePicture: this.pictureURL
          });
          this.toggleProfilePicture();
          this.pictureURL = '';
        } else {
          alert('Please enter a valid URL.');
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
          <div class="user-dropdown-header">
            <div class="helloMessage">Hello, {{ user.firstName }}</div>
            <img :src="profilePictureUrl" alt="Profile Picture" class="profile-picture" />
          </div>
          <div class="user-dropdown-container">
            <div v-if="dropdownVisible" class="user-menu" ref="userMenu">
              <img :src="profilePictureUrl" alt="Profile Picture" class="profile-large"/>
              <div class="rating">
                <template v-for="i in 5">
                    <font-awesome-icon v-if="i <= userRating" icon="fa-solid fa-star" class="full-star" :key="'full-' + i" />
                    <font-awesome-icon v-else icon="fa-regular fa-star" class="hollow-star" :key="'hollow-' + i" />
                </template>
            </div>
            <div class="reviews" v-if="user.userReviews.length == 1">{{ user.userReviews.length }} Review</div>
            <div class="reviews" v-else>{{ user.userReviews.length }} Reviews</div>
              <div class="user-info">
                <ul class="flex">
                  <h3>{{ user.firstName }} {{ user.lastName }}</h3>
                  <button class="profile-button" @click="toggleProfilePicture">Change Profile Picture</button>
                </ul>
                <p>{{ user.email }}</p>
                <ul class="flex">
                  <p>Balance: {{ user.balance }} <font-awesome-icon icon="fa-solid fa-euro-sign" /> </p>
                  <button class="profile-button" @click="toggleMoney">Add Money</button>
                </ul>
                <p>Total Sales Amount: {{ user.totalSales }} <font-awesome-icon icon="fa-solid fa-euro-sign" /> </p>
                <p>Total Purchases Amount: {{ user.totalPurchases }} <font-awesome-icon icon="fa-solid fa-euro-sign" /> </p>
              </div>
              <button @click="logOut" class="logout-button">Log Out</button>
            </div>
          </div>
          
        </li>
        
      </ul>
      
    </ul>
  </nav>
  <div v-if="addMoney" id="payment-modal" class="modal" @click="toggleMoney">
    <div class="modal-content" @click.stop>
      <h2>Payment Information</h2>
      <form class="form-column" @submit.prevent="confirmPayment">
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber">
        </div>
        <div class="form-group">
          <label for="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate">
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv">
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" name="amount" v-model="amountToAdd">
        </div>
        <button type="submit" class="logout-button">Confirm Payment</button>
        <p>(This is a mock-up form, do not use real credit card information)</p>
      </form>
    </div>
  </div>

  <div v-if="changeProfilePic" id="payment-modal" class="modal" @click="toggleProfilePicture">
    <div class="modal-content" @click.stop>
      <h2>Change Profile Picture</h2>
      <form class="form-column" @submit.prevent="updateProfilePicture">
        <div class="form-group">
          <label for="pictureURL">Picture URL</label>
          <input type="text" id="pictureURL" name="pictureURL" v-model="pictureURL">
        </div>
        <button type="submit" class="logout-button">Confirm Change</button>
      </form>
    </div>
  </div>

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
    color: white;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    font-size: large;
    margin-left: 20px;
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
  .profile-picture {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-left: 10px;
  vertical-align: middle;
}


.user-menu-container {
  position: relative;
}

.user-menu {
  position: absolute;
  max-height: 70vh;
  overflow-y: auto;
  top: calc(100% + 20px);
  right: 0;
  z-index: 100;
  min-width: 330px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  text-align: center;
}

.user-menu p{
  font-size: 15px;
}

.logout-button {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 20px;
  background-color: var(--theme-color);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: large;
  box-shadow: none;
  border: none;
  margin-top: 20px;
}

.logout-button:hover {
  opacity: 0.8;
}

.profile-button{
  color: white;
  background-color: var(--theme-color);
  cursor: pointer;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 12px;
  margin-left: 20px;
  box-shadow: none;
  border: none;
}

.profile-button:hover{
  opacity: 0.8;
}

.helloMessage:hover{
  color: var(--theme-color);
}

.user-dropdown-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.flex{
  display: flex;
  align-items: center;
}

.rating {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.full-star, .hollow-star {
  color: var(--theme-color);
  margin-right: 3px;
}

.reviews{
    text-align: center;
    font-family: 'Montserrat', sans-serif;
}

.profile-large{
  align-self: center;
}

.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 80%;
  max-width: 400px;
}

.form-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input {
  max-width: 250px;
}

</style>
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(firebaseApp);

export { db, firebaseApp};
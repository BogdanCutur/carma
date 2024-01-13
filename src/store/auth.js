import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(newUser) {
      this.user = newUser;
    },
    async refreshUser(userId) {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        this.setUser(userDoc.data());
      } else {
        console.error("User data not found in database");
      }
    }
  },
});
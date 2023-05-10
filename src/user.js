import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase.js';

export const saveUser = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: '',
        totalSales: 0,
        totalPurchases: 0,
        balance: 0,
        userReviews: [],
        subscribed: false,
    });
    console.log('User document created:', user.uid);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};
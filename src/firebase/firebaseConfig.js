// src/firebase/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5u2l1NT3FpR6Mb5BD0d4MVHaubBwKmeA",
  authDomain: "e-commerce-app-68344.firebaseapp.com",
  databaseURL: "https://e-commerce-app-68344-default-rtdb.firebaseio.com",
  projectId: "e-commerce-app-68344",
  storageBucket: "e-commerce-app-68344.appspot.com", // ✅ Fixed this
  messagingSenderId: "567810988134",
  appId: "1:567810988134:web:3999a56ab9a8e80bdc75a7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const firestore = getFirestore(app); // For Firestore

export { auth, firestore };

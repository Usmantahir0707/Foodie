// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBvpA4aCrX9jKA-L3IsO1FwAUFl0l8qdek",
  authDomain: "foodie-deliver.firebaseapp.com",
  databaseURL: "https://foodie-deliver-default-rtdb.firebaseio.com",
  projectId: "foodie-deliver",
  storageBucket: "foodie-deliver.firebasestorage.app",
  messagingSenderId: "772952462160",
  appId: "1:772952462160:web:4d7ec6d737ca2a92061255",
};

// Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);

// Export the same auth instance everywhere
export const auth = getAuth(app);

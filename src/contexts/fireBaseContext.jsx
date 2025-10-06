import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut, // 👈 added import
} from "firebase/auth";
import { getDatabase, set, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvpA4aCrX9jKA-L3IsO1FwAUFl0l8qdek",
  authDomain: "foodie-deliver.firebaseapp.com",
  databaseURL: "https://foodie-deliver-default-rtdb.firebaseio.com",
  projectId: "foodie-deliver",
  storageBucket: "foodie-deliver.firebasestorage.app",
  messagingSenderId: "772952462160",
  appId: "1:772952462160:web:4d7ec6d737ca2a92061255",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const FirebaseContext = createContext(null);

export function FirebaseProvider({ children }) {
  const confirmationResultRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Email signup (existing)
  const signupUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // --- Email login
  const loginUserWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);



  // --- Database helpers (existing)
  const putData = (key, data) => set(ref(database, key), data);
  const getData = (key) => get(ref(database, key));

  // --- Phone Auth (existing)
  const recaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
    return window.recaptchaVerifier;
  };

  const sendOtp = async (phoneNumber) => {
    if (!phoneNumber) return console.log("enter valid number");
    try {
      const appVerifier = recaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      confirmationResultRef.current = confirmationResult;
      alert("OTP sent");
      return confirmationResult;
    } catch (err) {
      console.log(err);
      alert("Failed to send OTP: " + err.message);
    }
  };

  const verifyOtp = async (otp, confirmationObjRef) => {
    try {
      if (!confirmationObjRef.current) throw new Error("No OTP session.");
      const verifyRes = await confirmationObjRef.current.confirm(otp);
      alert("Phone number verified successfully 🎉");
      return verifyRes;
    } catch (err) {
      console.error("Verify OTP Error:", err);
      alert("Invalid OTP. Try again.");
      throw err;
    }
  };


  const getUser = () => auth.currentUser;


  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        signupUserWithEmail,
        loginUserWithEmail,
        putData,
        getData,
        sendOtp,
        verifyOtp,
        getUser,
        logoutUser, 
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}

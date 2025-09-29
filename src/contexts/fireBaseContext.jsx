import React, { createContext, useContext, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
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
  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);

  // --- Email signup
  const signupUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // --- Database
  const putData = (key, data) => set(ref(database, key), data);
  const getData = (key) => get(ref(database, key));

  // --- Phone Auth
  const initRecaptcha = async (containerId = "recaptcha-container") => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        containerId,
        { size: "invisible" },
        auth
      );
      await recaptchaVerifierRef.current.render();
    }
    return recaptchaVerifierRef.current;
  };

  const sendOtp = async (phoneNumber, disableAppVerification = false) => {
    try {
      const appVerifier = await initRecaptcha();

      // For local testing with fake numbers, override verify()
      if (disableAppVerification && appVerifier.verify) {
        appVerifier.verify = async () => "fake-recaptcha-response";
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      confirmationResultRef.current = confirmationResult;
      return confirmationResult;
    } catch (err) {
      console.error("Firebase sendOtp error:", err);
      throw err;
    }
  };

  const verifyOtp = async (code) => {
    if (!confirmationResultRef.current)
      throw new Error("No OTP session found. Please resend.");
    return confirmationResultRef.current.confirm(code);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmail,
        putData,
        getData,
        sendOtp,
        verifyOtp,
      }}
    >
      {children}
      <div id="recaptcha-container"></div>
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}

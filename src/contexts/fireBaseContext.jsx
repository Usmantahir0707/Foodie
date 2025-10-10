import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updatePassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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

  // --- Email signup
  const signupUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // --- Email login
  const loginUserWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // --- Database helpers
  const putData = (key, data) => set(ref(database, key), data);
  const getData = (key) => get(ref(database, key));
  const updateData = (path, data) => update(ref(database, path), data);

  // --- Phone Auth
  const recaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }
    return window.recaptchaVerifier;
  };

  const sendOtp = async (phoneNumber) => {
    if (!phoneNumber) return console.log("enter valid number");
    try {
      const appVerifier = recaptcha();
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      confirmationResultRef.current = confirmationResult;
      alert("OTP sent");
      return confirmationResult;
    } catch (err) {
      console.log(err);
      alert("Failed to send OTP: " + err.message);
      throw err;
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

  // --- Update Password
  const updateUserPassword = async (newPassword) => {
    if (!auth.currentUser) throw new Error("No user is currently signed in.");
    try {
      await updatePassword(auth.currentUser, newPassword);
      alert("Password updated successfully!");
    } catch (err) {
      console.error("Error updating password:", err);
      alert("Failed to update password: " + err.message);
      throw err;
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
        updateUserPassword,
        updateData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}

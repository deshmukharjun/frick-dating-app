import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDzpZJkn1fUxehcVN6gkzKQP6vFFQtyxow",
  authDomain: "frickdating-6555c.firebaseapp.com",
  projectId: "frickdating-6555c",
  storageBucket: "frickdating-6555c.firebasestorage.app",
  messagingSenderId: "487779090733",
  appId: "1:487779090733:web:e3d1ce1f18a689de1c93a4"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
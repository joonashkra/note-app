
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9DA9YND2pq5jdm1GTW7pFKqtdyDdoMLc",
  authDomain: "w81base.firebaseapp.com",
  projectId: "w81base",
  storageBucket: "w81base.appspot.com",
  messagingSenderId: "642411717438",
  appId: "1:642411717438:web:a208be756bb14cad28c26f",
  measurementId: "G-4ZMNCRBND7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
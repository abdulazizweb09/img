import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOwXrxfgARFWiTQcbQFWOcglW23ur3uYo",
  authDomain: "insta-bf597.firebaseapp.com",
  projectId: "insta-bf597",
  storageBucket: "insta-bf597.firebasestorage.app",
  messagingSenderId: "177653898395",
  appId: "1:177653898395:web:530b554459e4844e2f3a3e",
  measurementId: "G-28E1TEG1SF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

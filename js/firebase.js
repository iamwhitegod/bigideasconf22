import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4_i8lCvMv3laOKAiomSfOw2elefQHiiQ",
  authDomain: "big-ideas-efde6.firebaseapp.com",
  projectId: "big-ideas-efde6",
  storageBucket: "big-ideas-efde6.appspot.com",
  messagingSenderId: "94653657224",
  appId: "1:94653657224:web:d1f47266af00478f352f3d",
  measurementId: "G-49GJ19FFJR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

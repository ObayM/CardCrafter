// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYTrNs4-vOe6FWgnEOw4novrJIgnbq6rc",
  authDomain: "flashcardsaas-640e1.firebaseapp.com",
  projectId: "flashcardsaas-640e1",
  storageBucket: "flashcardsaas-640e1.appspot.com",
  messagingSenderId: "773957775690",
  appId: "1:773957775690:web:2bdabc612b6d26ef0c91b3",
  measurementId: "G-WTRV7E78QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
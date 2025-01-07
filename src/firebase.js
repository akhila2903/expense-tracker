// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9aj8JD-Llz9JpM9XWKxM1EH2Rz3Bo0Ss",
  authDomain: "expense-tracker-29478.firebaseapp.com",
  projectId: "expense-tracker-29478",
  storageBucket: "expense-tracker-29478.firebasestorage.app",
  messagingSenderId: "1037323254989",
  appId: "1:1037323254989:web:68967e0577bfc91d24fd84"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;

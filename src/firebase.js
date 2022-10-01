
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyBlvlgwcy1sbtjmoTsXde7fEKmm9btZBxo",
  authDomain: "react-professional-portfolio.firebaseapp.com",
  databaseURL: "https://react-professional-portfolio-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-professional-portfolio",
  storageBucket: "react-professional-portfolio.appspot.com",
  messagingSenderId: "147936441385",
  appId: "1:147936441385:web:c50046a4c1362cad05d838"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const database = getDatabase(app)

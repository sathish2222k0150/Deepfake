// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDiR0NjdRwvnF3FgrOdSMLqmag0iIxhMYI",
    authDomain: "auth-86420.firebaseapp.com",
    projectId: "auth-86420",
    storageBucket: "auth-86420.firebasestorage.app",
    messagingSenderId: "625108244692",
    appId: "1:625108244692:web:26912bf85cd9d6f8da8341",
    measurementId: "G-8KXT597NZD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

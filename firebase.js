// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Yl3dt8w0_Hwqg2WBybfu32_GN8zKpeQ",
  authDomain: "mtdb-6b218.firebaseapp.com",
  projectId: "mtdb-6b218",
  storageBucket: "mtdb-6b218.firebasestorage.app",
  messagingSenderId: "1028584897962",
  appId: "1:1028584897962:web:3e8b8e8f5a2e61fb04ffd3",
  measurementId: "G-D9NZEH6NPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
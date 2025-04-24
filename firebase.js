// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {EXPO_PUBLIC_FIREBASE_API_KEY} from "@env";
import {EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN} from "@env";
import {EXPO_PUBLIC_FIREBASE_PROJECT_ID} from "@env";
import {EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET} from "@env";
import {EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID} from "@env";
import {EXPO_PUBLIC_FIREBASE_APP_ID} from "@env";
import {EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID} from "@env";
import {
    initializeAuth,
    getReactNativePersistence,
    GoogleAuthProvider,
  } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth with AsyncStorage persistence
  const auth =  getAuth(app);
  // Export Firebase objects
  export { app, auth, GoogleAuthProvider };

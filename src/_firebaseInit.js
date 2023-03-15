// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXWDqACRgQMQ45ombgwySgh62w6vBXJRY",
  authDomain: "accelerate-ux.firebaseapp.com",
  projectId: "accelerate-ux",
  storageBucket: "accelerate-ux.appspot.com",
  messagingSenderId: "374927157842",
  appId: "1:374927157842:web:0905b10d752f6c5e440d8b",
  measurementId: "G-9F3KK8B1S8"
};
// Initialize Firebase
import { initializeApp } from "firebase/app";
const fbApp = initializeApp(firebaseConfig);

import { getFunctions, httpsCallable } from "firebase/functions";
const fbFunc = getFunctions(fbApp);
const fbCall = httpsCallable;


export { 
  fbApp,
  fbFunc,
  fbCall
}
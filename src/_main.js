import { createApp } from 'vue';
import App from '@/_App.vue'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const app = createApp(App);

import { store } from '@/_store.js';
app.use(store);

import { router } from '@/_router.js';
app.use(router);

app.mount('#app');
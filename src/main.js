import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "ingrese su api key",
    authDomain: "teleoperacionsolar.firebaseapp.com",
    databaseURL: "https://teleoperacionsolar-default-rtdb.firebaseio.com",
    projectId: "teleoperacionsolar",
    storageBucket: "teleoperacionsolar.appspot.com",
    messagingSenderId: "835449639422",
    appId: "1:835449639422:web:748e058a35dc0c9ebd30af"
  };

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();

createApp(App)
  .use(router)
  .mount('#app')

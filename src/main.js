import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importaciones de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB6VanikYEfyqyCQVL4BxnzaXPbqALy_cw",
  authDomain: "teleoperacionsolar.firebaseapp.com",
  databaseURL: "https://teleoperacionsolar-default-rtdb.firebaseio.com",
  projectId: "teleoperacionsolar",
  storageBucket: "teleoperacionsolar.appspot.com",
  messagingSenderId: "835449639422",
  appId: "1:835449639422:web:748e058a35dc0c9ebd30af"
};


// Inicializar Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();


createApp(App)
  .use(router)  // Vinculamos el router para manejar la navegación
  .mount('#app');  // Montamos la aplicación en el elemento HTML con el ID 'app'

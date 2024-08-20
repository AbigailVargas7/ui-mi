import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importaciones de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  databaseURL: "tu-database-url",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};


// Inicializar Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();


createApp(App)
  .use(router)  // Vinculamos el router para manejar la navegación
  .mount('#app');  // Montamos la aplicación en el elemento HTML con el ID 'app'

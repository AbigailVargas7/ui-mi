import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { db, auth } from './firebase';  // Importar Firebase

const app = createApp(App);

app.use(router);  // Vinculamos el router para manejar la navegación

app.mount('#app');  // Montamos la aplicación en el elemento HTML con el ID 'app'

// Opcional: log para verificar que Firebase está funcionando
if (process.env.NODE_ENV !== 'production') {
  console.log('Firebase Database:', db);
  console.log('Firebase Auth:', auth);
}

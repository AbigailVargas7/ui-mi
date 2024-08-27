import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { db, auth } from './firebase';  // Importar Firebase

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'animate.css';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(router)  // Vinculamos el router para manejar la navegació
  .mount('#app');  // Montamos la aplicación en el elemento HTML con el ID 'app'

// Opcional: log para verificar que Firebase está funcionando
if (process.env.NODE_ENV !== 'production') {
  console.log('Firebase Database:', db);
  console.log('Firebase Auth:', auth);
}



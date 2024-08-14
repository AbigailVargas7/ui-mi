<template>
  <!-- El componente router-view actúa como un contenedor dinámico que muestra el componente correspondiente a la ruta actual -->
  <router-view></router-view>
</template>

<script>
// Importamos la función onAuthStateChanged de Firebase para monitorear el estado de autenticación del usuario
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './main'; // Importamos la instancia de autenticación configurada en main.js

export default {
  // El hook 'created' se ejecuta cuando la instancia del componente se crea, antes de que el DOM se monte
  created() {
    // Monitorea el estado de autenticación del usuario
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado y se encuentra en la página de inicio de sesión, redirigirlo al panel
        if (this.$route.path === '/') {
          this.$router.push('/panel');
        }
      } else {
        // Si el usuario no está autenticado y está intentando acceder a una ruta distinta de la página de inicio de sesión, redirigirlo a la página de inicio de sesión
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      }
    });
  }
}
</script>

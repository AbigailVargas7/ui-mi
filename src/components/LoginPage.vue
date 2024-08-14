<template>
  <!-- Contenedor principal para todo el componente -->
  <div class="back-container">
    <!-- Contenedor del login que engloba la imagen y el formulario -->
    <div class="login-container">
      <!-- Sección para mostrar una imagen decorativa -->
      <div class="login-image">
        <img src="@/assets/solar-panel.jpg" alt="Solar Panel" />
      </div>
      <!-- Sección del formulario de login -->
      <div class="login-form">
        <!-- Logo de la empresa o aplicación -->
        <img src="@/assets/cyted-logo.png" alt="CYTED Logo" class="logo" />
        <!-- Formulario para el inicio de sesión -->
        <form @submit.prevent="handleLogin" class="form">
          <div class="form-structure">
            <!-- Campo para ingresar el nombre de usuario o correo -->
            <div class="form-group">
              <label for="username">Usuario</label>
              <input
                type="text"
                id="username"
                placeholder="Ingrese su correo"
                v-model="username"
                required
              />
            </div>
            <!-- Campo para ingresar la contraseña -->
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                v-model="password"
                required
              />
            </div>
          </div>
          <!-- Botón para enviar el formulario de inicio de sesión -->
          <button type="submit" class="login-button">Iniciar Sesión</button>
        </form>
        <!-- Mensaje de error en caso de que el login falle -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <!-- Enlaces para recuperar contraseña o registrarse -->
        <div class="login-links">
          <a href="#" class="link">Recuperar contraseña</a>
          <a href="#" class="link" @click.prevent="goToRegister">Realizar nuevo registro</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// Importamos el método para autenticación con Firebase y el objeto auth previamente configurado
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../main'; // Obtenemos la instancia de autenticación desde el archivo main.js

export default {
  name: "LoginPage", // Nombre del componente para identificación
  data() {
    return {
      // Variables reactivas para almacenar los datos del usuario y el mensaje de error
      username: "", // Correo electrónico del usuario
      password: "", // Contraseña del usuario
      errorMessage: "", // Mensaje de error en caso de fallo de autenticación
    };
  },
  methods: {
    // Método asincrónico para manejar el login del usuario
    async handleLogin() {
      try {
        // Intento de inicio de sesión usando el correo y la contraseña con Firebase
        await signInWithEmailAndPassword(auth, this.username, this.password);
        // Redirigir al usuario al panel de control si el login es exitoso
        this.$router.push("/panel");
      } catch (error) {
        // Mostrar un mensaje de error si ocurre algún problema durante la autenticación
        this.errorMessage = "Usuario o contraseña incorrectos.";
        console.error("Error de autenticación:", error);
      }
    },
    // Método para redirigir al usuario a la página de registro
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>


<style scoped>
/* Estilos básicos para html y body */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
}

/* Estilo para el contenedor de fondo */
.back-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

/* Estilo para el contenedor principal del login */
.login-container {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* Estilo para la imagen de login */
.login-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to top,
    rgba(8, 0, 78, 0.75) 8%,
    rgba(68, 56, 182, 0.75) 20%,
    rgba(111, 95, 255, 0.75) 41%,
    rgba(249, 249, 255, 0.75) 76%
  );
  width: 50%; /* Ocupa la mitad izquierda de la pantalla */
  height: 100vh; /* Asegura que ocupe toda la altura de la pantalla */
  overflow: hidden;
}

.login-image img {
  width: 95%;
  height: 95%;
  object-fit: fill;
}

/* Estilo para el formulario de login */
.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
}

/* Estructura de los elementos del formulario */
.form-structure {
  margin-bottom: 15px;
}

/* Estilo del logo en el formulario */
.logo {
  width: 150px;
  margin-bottom: 30px;
}

/* Estilo general del formulario */
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}

/* Estilo para los grupos de formularios */
.form-group {
  margin-bottom: 25px;
  width: 100%;
}

/* Estilo para las etiquetas de los formularios */
.form-group label {
  display: block;
  margin-bottom: 5px;
  margin-left: 20px; 
  padding: 2px;
  font-weight: bold;
  font-size: 14px; 
  text-align: left; 
  color: #333;
}

/* Estilo para los campos de entrada del formulario */
.form-group input {
  width: 250px; 
  padding: 2px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ffffff; 
 }

/* Estilo para el botón de login */
.login-button {
  padding: 0px;
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px; /* Bordes redondeados */
  cursor: pointer;
  font-weight: bold;
  font-size: 14px; /* Tamaño de la fuente ajustado */
  width: 156px; /* Ancho ajustado */
  height: 35px; /* Altura ajustada */
  margin: 0 auto;
}

/* Estilo para el botón de login cuando se pasa el ratón por encima */
.login-button:hover {
  background-color: #f0f0f0;
  color: #1e90ff;
  border-color: #1e90ff;
}

/* Estilo para los enlaces de recuperación de contraseña y registro */
.login-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
}

/* Estilo para los enlaces */
.login-links .link {
  color: #bebebe;
  text-decoration: none;
  font-weight: bold;
  font-size: 12px;
  font-family: Arial, sans-serif;
  text-decoration: underline;
}

.login-links .link:hover {
  color: #4d4c4c;
}

/* Estilo para el mensaje de error */
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>

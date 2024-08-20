<template>
  <!-- Contenedor principal para el fondo de la página de registro -->
  <div class="background-container">
    <!-- Contenedor principal del formulario de registro -->
    <div class="register-container">
      <!-- Botón para regresar a la página de login -->
      <button @click="goBack" class="back-button"></button>
      
      <!-- Formulario de registro -->
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-container">
          <!-- Grupo de campos para ingresar el nombre de usuario -->
          <div class="form-group">
            <label for="username">Ingrese su Usuario</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              placeholder="Nombre de usuario" 
              required 
            />
          </div>

          <!-- Grupo de campos para ingresar el correo electrónico -->
          <div class="form-group">
            <label for="email">Ingrese su correo</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="usuario@institucion.edu.ec"
              required
            />
          </div>

          <!-- Grupo de campos para ingresar la nueva contraseña -->
          <div class="form-group">
            <label for="password">Nueva contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Cree su contraseña"
              minlength="8"
              required
            />
          </div>

          <!-- Grupo de campos para confirmar la nueva contraseña -->
          <div class="form-group">
            <label for="confirm-password">Comprobar nueva contraseña</label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              placeholder="Confirme su contraseña"
              required
            />
          </div>

          <!-- Botón para guardar el registro -->
          <button type="submit" class="register-button"> Guardar Registro </button>

          <!-- Mensaje de error en caso de que ocurra un problema durante el registro -->
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
// Importamos las funciones y hooks necesarios de Vue y Firebase
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; // Importamos las funciones necesarias
import { auth } from '../main'; // Importamos la instancia de autenticación desde main.js

export default {
  setup() {
    // Definimos variables reactivas para manejar los datos del formulario
    const username = ref(''); // Nombre de usuario
    const email = ref(''); // Correo electrónico
    const password = ref(''); // Contraseña
    const confirmPassword = ref(''); // Confirmación de la contraseña
    const errorMessage = ref(''); // Mensaje de error si ocurre algún problema durante el registro
    const router = useRouter(); // Hook de Vue Router para la navegación

    // Función para manejar el proceso de registro
    const handleRegister = async () => {
      // Validación para comprobar si las contraseñas coinciden
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Las contraseñas no coinciden.";
        return;
      }

      // Verificación del dominio de correo permitido
      const allowedDomains = ['espol.edu.ec'];
      const emailDomain = email.value.split('@')[1];
      if (!allowedDomains.includes(emailDomain)) {
        errorMessage.value = "El dominio de su correo no está permitido.";
        return;
      }

      try {
        // Intento de crear un usuario en Firebase Authentication con correo y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Enviar correo de verificación
        await sendEmailVerification(user);

        // Mostrar un mensaje de éxito y redirigir a la página de login
        alert('Correo de verificación enviado. Por favor, revise su bandeja de entrada.');
        router.push('/'); // Redirigir a la página de login
      } catch (error) {
        // Si ocurre un error durante el registro, mostrar el mensaje de error
        errorMessage.value = "Error de registro: " + error.message;
      }
    };

    // Función para regresar a la página de login
    const goBack = () => {
      router.push('/'); // Redirige al usuario a la página de inicio de sesión
    };

    // Retornamos las variables y funciones para que puedan ser usadas en el template
    return {
      username,
      email,
      password,
      confirmPassword,
      handleRegister,
      goBack,
      errorMessage
    };
  }
}
</script>



<style scoped>
/* Estilos básicos para html y body */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

/* Contenedor de fondo */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #e5d7ff,
    #e2fffc 29%,
    #fdfffe 48%,
    #b5ffc5 76%,
    #ffffff
  );
  z-index: -1;
}

/* Contenedor principal del formulario de registro */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: inherit;
}

/* Contenedor del formulario */
.form-container{
  padding: 5px;
  margin-top: 10px;
}

/* Estilo del formulario de registro */
.register-form {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Estilo de los grupos de campos de formulario */
.form-group {
  margin-bottom: 10px;
  margin-top: 25px;
}

/* Estilo de las etiquetas de los campos */
.form-group label {
  display: block;
  margin-bottom: 5px;
  margin-left: 70px;
  padding: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  color: #333;
}

/* Estilo de los campos de entrada */
.form-group input {
  width: 250px;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

/* Estilo del botón para regresar a la página de login */
.back-button{
  position: absolute;
  top: 20px; 
  left: 20px; 
  width: 40px;
  height: 40px;
  background-color: white; /* Fondo blanco del botón */
  border: 2px solid #1e90ff; /* Borde de color azul */
  border-radius: 50%; /* Hace que el botón sea redondo */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; /* Suaviza la transición del fondo */
}
.back-button::before {
  content: '←'; /* Flecha de retroceso */
  color: #1e90ff; /* Color de la flecha */
  font-size: 25px;
  font-weight: bold;
}

.back-button:hover {
  background-color: #f0f0f0;
}

/* Estilo del botón para guardar el registro */
.register-button {
  padding: 0px;
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 166px;
  height: 42px;
  margin-top: 10px;
}

/* Estilo del botón al pasar el ratón por encima */
.register-button:hover {
  background-color: #f0f0f0;
  color: #1e90ff;
  border-color: #1e90ff;
}

/* Estilo del mensaje de error */
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>

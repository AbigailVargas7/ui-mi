<template>
  <div class="back-container">
    <div class="login-container">
      <div class="login-image">
        <img src="@/assets/solar-panel.jpg" alt="Solar Panel" />
      </div>
      <div class="login-form">
        <img src="@/assets/cyted-logo.png" alt="CYTED Logo" class="logo" />
        <form @submit.prevent="handleLogin" class="form">
          <div class="form-structure">
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingrese su correo"
                v-model="email"
                required
              />
            </div>
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
          <button type="submit" class="login-button">Iniciar Sesión</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="infoMessage" class="info-message">{{ infoMessage }}</p>
        <div class="login-links">
          <a href="#" class="link">Recuperar contraseña</a>
          <a href="#" class="link" @click.prevent="goToRegister">Realizar nuevo registro</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth } from '../firebase';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const infoMessage = ref('');
    const router = useRouter();
    const route = useRoute();

    const handleLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        if (user.emailVerified) {
          router.push('/initial'); // Redirigir al panel si el usuario está verificado
        } else {
          errorMessage.value = "Por favor, verifica tu correo electrónico antes de iniciar sesión.";
          await auth.signOut(); // Cerrar sesión si no está verificado
        }
      } catch (error) {
        errorMessage.value = "Usuario o contraseña incorrectos.";
      }
    };

    const goToRegister = () => {
      router.push('/register');
    };

    onMounted(() => {
      if (route.query.message === 'verify-email') {
        infoMessage.value = 'Registro exitoso. Por favor, revisa tu correo electrónico para verificar tu cuenta.';
      }
    });

    return {
      email,
      password,
      handleLogin,
      goToRegister,
      errorMessage,
      infoMessage
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
  width: 50%;
  height: 100vh;
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
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 156px;
  height: 35px;
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
/* Estilo para el mensaje informativo */
.info-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>

<template>
  <div class="background-container">
    <div class="register-container">
      <v-btn
        color="cyan-lighten-4"
        icon="mdi-arrow-left-bold"
        elevation="4"
        width="40px"
        height="40px"
        class="back-button"
        @click="goBack"
      ></v-btn>
      <!-- <button @click="goBack" class="back-button"></button> -->
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-container">
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
          <!-- <button 
            type="submit" 
            class="register-button" 
            :disabled="loading || !isFormValid">
            {{ loading ? 'Registrando...' : 'Guardar Registro' }}
          </button> -->
          <v-btn
            type="submit"
            class="button"
            color="cyan-lighten-4"
            elevation="4"
            rounded="xl"
            :disabled="loading || !isFormValid"
          >
            {{ loading ? "Registrando..." : "Guardar Registro" }}
          </v-btn>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const loading = ref(false);
    const router = useRouter();

    // Lista de dominios permitidos
    const allowedDomains = ["espol.edu.ec", "otrodominio.com"]; // Añade los dominios permitidos aquí

    const isFormValid = computed(() => {
      return (
        email.value &&
        password.value &&
        confirmPassword.value &&
        password.value === confirmPassword.value
      );
    });

    const validateEmailDomain = (email) => {
      const domain = email.split("@")[1];
      return allowedDomains.includes(domain);
    };

    const handleRegister = async () => {
      if (!validateEmailDomain(email.value)) {
        errorMessage.value = "El dominio de su correo no está permitido.";
        return;
      }

      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Las contraseñas no coinciden.";
        return;
      }

      try {
        loading.value = true;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        await sendEmailVerification(user);

        router.push({
          path: "/",
          query: { message: "verify-email" },
        });
      } catch (error) {
        errorMessage.value = "Error de registro: " + error.message;
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.push("/");
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      handleRegister,
      goBack,
      errorMessage,
      loading,
      isFormValid,
    };
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

.form-container {
  display: flex; /* Utiliza Flexbox */
  justify-content: center; /* Centra horizontalmente */
  align-items: center;
  padding: 0px;
  margin-top: 10px;
  flex-direction: column;
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

/* Grupo de campos de formulario */
.form-group {
  margin-bottom: 10px;
  margin-top: 20px;
}

/* Estilo de las etiquetas */
.form-group label {
  display: block;
  margin-bottom: 5px;
  margin-left: 0px;
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

/* Botón para regresar a la página de login */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}

/* Estilo del botón de registro */
.button {
  margin-top: 20px;
  font-size: 12px !important;
}

.register-button:disabled {
  background-color: #e0e0e0;
  color: #b0b0b0;
  border-color: #b0b0b0;
  cursor: not-allowed;
}

/* Estilo del mensaje de error */
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>

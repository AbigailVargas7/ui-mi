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
              <label for="username">Usuario</label>
              <input
                type="text"
                id="username"
                placeholder="Ingrese su correo"
                v-model="username"
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

        <div class="login-links">
          <a href="#" class="link">Recuperar contraseña</a>
          <a href="#" class="link" @click.prevent="goToRegister"
            >Realizar nuevo registro</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // Aquí puedes agregar la lógica de autenticación
      console.log("Usuario:", this.username);
      console.log("Contraseña:", this.password);
      //redirigir a la pagina principal
      this.$router.push("/panel");
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
}
.back-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.login-container {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

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

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
}
.form-structure {
  margin-bottom: 15px;
}

.logo {
  width: 150px;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}

.form-group {
  margin-bottom: 25px;
  width: 100%;
}

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

.form-group input {
  width: 250px; 
  padding: 2px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ffffff; 
 }

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

.login-button:hover {
  background-color: #f0f0f0;
  color: #1e90ff;
  border-color: #1e90ff;
}

.login-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
}

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
</style>

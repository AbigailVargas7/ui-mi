<!--
<style scoped>
.login-container {
  display: flex;
}

.login-image img {
  max-width: 100%;
}

.login-form {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form img {
  width: 150px;
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.login-form div {
  margin-bottom: 15px;
}

.login-links {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
-->


<template>
  <div class="login-container">
  <!--<div class="contenido-login"> --> 
    <div class="login-image">
      <img src="@/assets/solar-panel.jpg" alt="Solar Panel">
    </div>

    <div class="login-form">
    <!--<div class="formulario-login"> -->

      <img src="@/assets/cyted-logo.png" alt="CYTED Logo" class="logo">
     
      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
        <!--<div class="grupo-formulario"> -->
          <label for="username">Usuario</label>
          <input type="text" id="username" v-model="username" required>
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="login-button">Iniciar Sesión</button>
      </form>

      <div class="login-links">
        <a href="#" class="link">Recuperar contraseña</a>
        <a href="#" class="link">Realizar nuevo registro</a>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // Aquí puedes agregar la lógica de autenticación
      console.log('Usuario:', this.username)
      console.log('Contraseña:', this.password)
    }
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-family: Arial, sans-serif;
}
/*.contenido-login{*/
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.login-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #4facfe, #00f2fe);
}

.login-image img {
  max-width: 100%;
  height: auto;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
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
  margin-bottom: 20px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-button {
  padding: 10px;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.login-button:hover {
  background-color: #00f2fe;
}

.login-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
}

.login-links .link {
  color: #4facfe;
  text-decoration: none;
  font-weight: bold;
}

.login-links .link:hover {
  text-decoration: underline;
}
</style>

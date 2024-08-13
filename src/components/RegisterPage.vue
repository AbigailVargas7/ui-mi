<template>
  <div class="background-container">
    <div class="register-container">
      <button @click="goBack" class="back-button"></button>
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-container">
          <div class="form-group">
            <label for="username">Ingrese su Usuario</label>
            <input type="text" id="username" placeholder="Nombre de usuario" required />
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
          <button type="submit" class="register-button"> Guardar Registro </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    handleRegister() {
      if (this.password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
      }
      if (this.password !== this.confirmPassword ) {
        alert("Las contraseñas no coinciden");
        return;
      }
      this.$router.push("/");
    },
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
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

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: inherit;
}
.form-container{
  padding: 5px;
  margin-top: 10px;
}
.register-form {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 10px;
  margin-top: 25px;
}

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

.form-group input {
  width: 250px;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
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

.register-button:hover {
  background-color: #f0f0f0;
  color: #1e90ff;
  border-color: #1e90ff;
}
</style>

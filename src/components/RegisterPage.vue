<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Ingrese su Usuario</label>
        <input type="text" id="username" placeholder="Nombre de usuario" />
      </div>
      <div class="form-group">
        <label for="email">Ingrese su correo</label>
        <input type="email" id="email" placeholder="usuario@institucion.edu.ec" />
      </div>
      <div class="form-group">
        <label for="password">Nueva contraseña</label>
        <input type="password" id="password" placeholder="Crea tu contraseña" />
      </div>
      <div class="form-group">
        <label for="confirm-password">Comprobar nueva contraseña</label>
        <input type="password" id="confirm-password" placeholder="Crea tu contraseña" />
      </div>
      <button type="submit" class="register-button">Guardar Registro</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
   methods: {
    handleRegister() {
      // Aquí puedes agregar la lógica de registro si es necesario
      
      // Redirigir a PanelPage después de registrar
      this.$router.push('/')
    }
  }

}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #E5D7FF, #E2FFFC 29%, #FDFFFE 48%, #B5FFC5 76%, #FFFFFF);
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
  margin-bottom: 15px;
  margin-top:25px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  padding:2px ;
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.form-group input {
  width: 250px;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.register-button {
  padding: 0px;
  background-color: #23A6F0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 166px;
  height: 42px;
  margin-top: 10px;
}

.register-button:hover {
  background-color: #1e90ff;
}
</style>

<template>
  <div class="panel-back">
    <div class="panel-container">
      <div class="top-bar-background">
        <header class="top-bar">
          <img src="@/assets/espol-logo.png" alt="Espol Logo" class="espol-logo" />
          <div class="account-info">
            <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" />
            <span>Mi Cuenta</span>
            <button class="logout-button" @click="logout">Cerrar Sesión</button>
          </div>
        </header>
      </div>
      <button class="back-button" @click="goBack">← Ir a Inicio</button>
      <div class="content">
        <div class="left-section">
          <h3>Criterios y Parámetros Eléctricos de Inversor</h3>
          <div class="input-group">
            <label for="voltage">Voltaje (V)</label>
            <input type="text" id="voltage" v-model="voltage" readonly />
          </div>
          <div class="input-group">
            <label for="current">Corriente (mA)</label>
            <input type="text" id="current" v-model="current" readonly />
          </div>
          <div class="input-group">
            <label for="power">Potencia (W)</label>
            <input type="text" id="power" v-model="power" readonly />
          </div>
          <button class="capture-button">Capturar Datos</button>
        </div>

        <div class="separator"></div>

        <div class="right-section">
          <h3>Vista de Cámara</h3>
          <div class="camera-view">
            <img src="@/assets/no-video.png" alt="No Video" />
          </div>
          
          <h3>Control de Inclinación de Paneles</h3>
          <div class="control-group">
            <div class="control-item">
              <button class="control-button" @click="adjustAngle(1, '+')">+</button>
              <input type="text" v-model="angles[0]" @change="updateAngle(1)" placeholder="Ángulo panel 1" />
              <button class="control-button" @click="adjustAngle(1, '-')">-</button>
            </div>
            <div class="control-item">
              <button class="control-button" @click="adjustAngle(2, '+')">+</button>
              <input type="text" v-model="angles[1]" @change="updateAngle(2)" placeholder="Ángulo panel 2" />
              <button class="control-button" @click="adjustAngle(2, '-')">-</button>
            </div>
            <div class="control-item">
              <button class="control-button" @click="adjustAngle(3, '+')">+</button>
              <input type="text" v-model="angles[2]" @change="updateAngle(3)" placeholder="Ángulo panel 3" />
              <button class="control-button" @click="adjustAngle(3, '-')">-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { signOut } from "firebase/auth";
import { auth } from '../main';
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";

export default {
  name: "PanelPage",
  setup() {
    const voltage = ref('');
    const current = ref('');
    const power = ref('');
    const angles = ref([0, 0, 0]);

    const db = getDatabase();

    onMounted(() => {
      // Leer valores de voltaje, corriente y potencia
      onValue(dbRef(db, 'voltaje'), (snapshot) => {  // Ajuste en la clave para voltaje
        voltage.value = snapshot.val();
      });

      onValue(dbRef(db, 'corriente'), (snapshot) => {  // Ajuste en la clave para corriente
        current.value = snapshot.val();
      });

      onValue(dbRef(db, 'potencia'), (snapshot) => {
        power.value = snapshot.val();
      });

      // Leer valores de ángulos
      onValue(dbRef(db, 'angulo'), (snapshot) => {
        angles.value[0] = snapshot.val();
      });
    });

    const updateAngle = (panel) => {
      set(dbRef(db, `angulo`), angles.value[panel - 1]);
    };

    const adjustAngle = (panel, operation) => {
      if (operation === '+') {
        angles.value[panel - 1]++;
      } else if (operation === '-') {
        angles.value[panel - 1]--;
      }
      updateAngle(panel);
    };

    const logout = async () => {
      try {
        await signOut(auth);
        this.$router.push('/');
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    return {
      voltage,
      current,
      power,
      angles,
      adjustAngle,
      updateAngle,
      logout,
    };
  }
}
</script>


<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.panel-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.panel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
  margin: 0;
}

.top-bar-background {
  width: 100%;
  height: 50px;
  background: linear-gradient(
    to right,
    rgba(0, 210, 246, 0.4) 0%,
    rgba(138, 174, 229, 0.4) 17%,
    rgba(29, 162, 186, 0.4) 40%,
    rgba(103, 218, 239, 0.4) 60%,
    rgba(169, 242, 255, 0.4) 75%,
    rgba(29, 162, 186, 0.4) 100%
  );
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: 0;
  height: 100%;
  padding: 0;
}

.espol-logo {
  height: 40px;
  margin-left : 30px;
}

.account-info {
  display: flex;
  align-items: center;
  color: #000000;
}

.user-icon {
  height: 30px;
  margin-right: 20px;
}

.logout-button {
  margin-left: 20px;
  padding: 5px 10px;
  background-color: #fce3e3;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px; /* Bordes redondeados */
  cursor: pointer;
  font-weight: bold;
  font-size: 14px; /* Tamaño de la fuente ajustado */
  width: 118px; /* Ancho ajustado */
  height: 35px; /* Altura ajustada */
  
}

.content {
  display: flex;
  flex: 1;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
}

.left-section {
  flex: 1;
  margin-left: 20px;
  margin-right: 30px;
  font-weight: bold;
  font-size: 14px; 
  color: #333;
  display: flex;
  flex-direction: column;
  
}

.right-section {
  flex: 1;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.separator {
  width: 2px;
  background-color: #ccc;
  margin: 0;
}

h3 {
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-style: italic;
  font-weight: 600; 
  text-decoration: underline;
  margin-bottom: 20px;
  color:#000000;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}

.input-group input {
  width: 50%; 
  padding: 2px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ffffff;
}

.capture-button {
  padding: 0px;
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px; /* Bordes redondeados */
  cursor: pointer;
  font-weight: bold;
  font-size: 14px; /* Tamaño de la fuente ajustado */
  width: 208px; /* Ancho ajustado */
  height: 35px; /* Altura ajustada */
  margin: 30px auto;
}
.back-button {
  padding: 0px;
  background-color: rgb(255, 255, 255);
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px; /* Bordes redondeados */
  cursor: pointer;
  font-weight: bold;
  font-size: 14px; /* Tamaño de la fuente ajustado */
  width: 108px; /* Ancho ajustado */
  height: 35px; /* Altura ajustada */
  margin: 30px ;
}
.camera-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 190px;
  width: 50%;
  background-color: #000;
  margin-bottom: 20px;
}

.camera-view img {
  width: 100%;
  height: 100%;
}

.control-group {
  display: flex;
  flex-direction: column;
}

.control-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.control-button {
  padding: 8px;
  background-color: #23a6f0;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.control-item input {
  flex: 1;
  padding: 2px;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 50%; 
  background-color: #ffffff;
}
.more-info-link {
  color: #8b8b8b;
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
  margin: 0 auto;
}
.more-info-link:hover {
  color: #000000;
  text-decoration: none; 
}
</style>

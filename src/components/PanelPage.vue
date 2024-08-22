<template>
  <div class="panel-back">
    <div class="panel-container">
      <div class="top-bar-background">
        <header class="top-bar">
          <img src="@/assets/espol-logo.png" alt="Espol Logo" class="espol-logo" />
          <div class="account-info">
            <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" />
             <button class="logout-button" @click="logout">Cerrar Sesión</button>
          </div>
        </header>
      </div>
      <button class="back-button" @click="goBack">← Inicio</button>
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
          <button @click="guardarValores" class="save-button">Guardar Valores</button>
          <button @click="goToTablePage" class="history-button">Ver Histórico de Datos</button>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </div>
        <div class="separator"></div>
        <div class="right-section">
          <h3>Vista de Cámara</h3>
          <div class="camera-view">
            <img src="@/assets/no-video.png" alt="No Video" />
          </div>
          <h3>Control de Inclinación de Paneles</h3>
          <div class="control-group">
            <!-- Primer control de ángulo conectado a Firebase -->
            <div class="control-item">
              <button class="control-button" @click="adjustAngleFromFirebase('+')">+</button>
              <input type="number" v-model.number="angleFromFirebase" @change="updateAngleFromFirebase" placeholder="Ángulo panel 1" min="0" max="25" />
              <button class="control-button" @click="adjustAngleFromFirebase('-')">-</button>
            </div>
            <!-- Otros dos controles de ángulo independientes -->
            <div class="control-item" v-for="(angle, index) in angles" :key="index">
              <button class="control-button" @click="adjustAngle(index, '+')">+</button>
              <input type="number" v-model.number="angles[index]" @change="updateAngle(index)" :placeholder="'Ángulo panel ' + (index + 2)" min="0" max="25" />
              <button class="control-button" @click="adjustAngle(index, '-')">-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { getDatabase, ref as dbRef, onValue, set, push, remove } from "firebase/database";

export default {
  name: "PanelPage",
  setup() {
    const router = useRouter(); 
    const voltage = ref('');
    const current = ref('');
    const power = ref('');
    const angleFromFirebase = ref(0);
    const angles = ref([0, 0]);
    const isLoading = ref(true);
    const successMessage = ref(null);
    const db = getDatabase();

    const fetchData = (path, targetRef) => {
      const dataRef = dbRef(db, path);
      onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
          targetRef.value = snapshot.val();
        }
      }, (error) => {
        console.error("Error fetching data: ", error);
      });
    };

    onMounted(() => {
      fetchData('voltaje', voltage);
      fetchData('corriente', current);
      fetchData('potencia', power);
      fetchData('angulo', angleFromFirebase);
      isLoading.value = false;
    });

    const updateAngleFromFirebase = () => {
      if (angleFromFirebase.value < 0) {
        angleFromFirebase.value = 0;
      } else if (angleFromFirebase.value > 25) {
        angleFromFirebase.value = 25;
      }

      set(dbRef(db, 'angulo'), angleFromFirebase.value)
        .then(() => console.log("Angle updated successfully"))
        .catch((error) => console.error("Error updating angle: ", error));
    };

    const adjustAngleFromFirebase = (operation) => {
      if (operation === '+') {
        angleFromFirebase.value = Math.min(25, angleFromFirebase.value + 1);
      } else if (operation === '-') {
        angleFromFirebase.value = Math.max(0, angleFromFirebase.value - 1);
      }
      updateAngleFromFirebase();
    };

    const updateAngle = (panelIndex) => {
      if (angles.value[panelIndex] < 0) {
        angles.value[panelIndex] = 0;
      } else if (angles.value[panelIndex] > 25) {
        angles.value[panelIndex] = 25;
      }
    };

    const adjustAngle = (panelIndex, operation) => {
      if (operation === '+') {
        angles.value[panelIndex] = Math.min(25, angles.value[panelIndex] + 1);
      } else if (operation === '-') {
        angles.value[panelIndex] = Math.max(0, angles.value[panelIndex] - 1);
      }
    };

    const guardarValores = () => {
      const fecha = new Date();
      const nuevoRegistro = {
        angulo: angleFromFirebase.value, 
        voltaje: voltage.value,
        corriente: current.value,
        potencia: power.value,
        fecha: fecha.toLocaleDateString(),
        hora: fecha.toLocaleTimeString(),
      };

      // Guardar en Firebase
      const newRegistroRef = push(dbRef(db, 'historicos'));
      set(newRegistroRef, nuevoRegistro)
        .then(() => {
          successMessage.value = "Valores guardados exitosamente.";
          setTimeout(() => {
            successMessage.value = null;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error al guardar valores:", error);
        });
    };

    const logout = async () => {
      try {
        const db = getDatabase();
        await remove(dbRef(db, 'historicos')); // Eliminar todos los registros
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    const goToTablePage = () => {
      router.push('/tabla');
    };

    return {
      voltage,
      current,
      power,
      angleFromFirebase,
      angles,
      isLoading,
      successMessage,
      adjustAngleFromFirebase,
      updateAngleFromFirebase,
      adjustAngle,
      updateAngle,
      guardarValores,
      logout,
      goToTablePage,
    };
  }
};
</script>

<style scoped>
/* Mantén los estilos que ya tenías */
html, body {
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
  background: linear-gradient(to right, rgba(0, 210, 246, 0.4) 0%, rgba(138, 174, 229, 0.4) 17%, rgba(29, 162, 186, 0.4) 40%, rgba(103, 218, 239, 0.4) 60%, rgba(169, 242, 255, 0.4) 75%, rgba(29, 162, 186, 0.4) 100%);
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
  margin-left: 30px;
}

.account-info {
  display: flex;
  align-items: center;
  color: #000000;
}

.user-icon {
  height: 30px;
  margin-right: 5px;
}

.logout-button {
  margin-left: 5px;
    background-color: transparent; /* Fondo transparente */
  color: #000000; /* Color del texto */
  border: none; /* Sin bordes */
  border-radius: 40px; /* Bordes redondeados (opcional si se necesita en el diseño) */
  cursor: pointer;
  font-weight: bold;
  font-size: 14px; /* Tamaño de la fuente ajustado */
  width: 118px; /* Ancho ajustado */
  height: 35px; /* Altura ajustada */
  transition: background-color 0.3s, color 0.3s; /* Efecto de transición para el hover */
}

/* Efecto hover opcional */
.logout-button:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Ligera transparencia al pasar el ratón */
  color: #000000; /* Asegura que el texto siga siendo visible */
}
.content {
  display: flex;
  flex: 1;
  margin-top: 10px;
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
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 208px;
  height: 35px;
  margin: 30px auto;
}
.back-button{
  padding: 0px;
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  width: 60px;
  height: 35px;
  margin: 10px;
}
.save-button {
  padding: 0px;
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 208px;
  height: 35px;
  margin: 30px auto;
}

.save-button:hover {
  background-color: #218838;
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

/* Estilo para el mensaje de éxito */
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>

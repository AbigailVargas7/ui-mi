<template>
  <!-- Contenedor principal del panel de control -->
  <div class="panel-back">
    <div class="panel-container">
      
      <!-- Barra superior que incluye el logo y la información del usuario -->
      <div class="top-bar-background">
        <header class="top-bar">
          <!-- Logo de Espol -->
          <img src="@/assets/espol-logo.png" alt="Espol Logo" class="espol-logo" />
          <!-- Información de la cuenta del usuario -->
          <div class="account-info">
            <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" />
            <span>Mi Cuenta</span>
            <!-- Botón para cerrar sesión -->
            <button class="logout-button" @click="logout">Cerrar Sesión</button>
          </div>
        </header>
      </div>

      <!-- Contenido principal del panel -->
      <div class="content">
        
        <!-- Sección izquierda con los criterios y parámetros eléctricos -->
        <div class="left-section">
          <h3>Criterios y Parámetros Eléctricos de Inversor</h3>
          <div class="input-group">
            <label for="voltage">Voltaje (V)</label>
            <!-- Campo de texto que muestra el voltaje obtenido de Firebase -->
            <input type="text" id="voltage" v-model="voltage" readonly />
          </div>
          <div class="input-group">
            <label for="current">Corriente (mA)</label>
            <!-- Campo de texto que muestra la corriente obtenida de Firebase -->
            <input type="text" id="current" v-model="current" readonly />
          </div>
          <div class="input-group">
            <label for="power">Potencia (W)</label>
            <!-- Campo de texto que muestra la potencia obtenida de Firebase -->
            <input type="text" id="power" v-model="power" readonly />
          </div>
          <!-- Botón para ver el histórico de datos -->
          <button class="history-button">Ver Histórico de Datos</button>
          <!-- Enlace para obtener más información del sistema -->
          <a href="#" class="more-info-link">Más información del Sistema</a>
        </div>

        <!-- Separador visual entre las dos secciones -->
        <div class="separator"></div>

        <!-- Sección derecha con la vista de cámara y control de inclinación -->
        <div class="right-section">
          <h3>Vista de Cámara</h3>
          <div class="camera-view">
            <!-- Imagen de marcador de "No hay video" -->
            <img src="@/assets/no-video.png" alt="No Video" />
          </div>
          
          <h3>Control de Inclinación de Paneles</h3>
          <div class="control-group">
            <!-- Controles para ajustar el ángulo de inclinación de los paneles -->
            <div class="control-item">
              <!-- Botones para aumentar y disminuir el ángulo del panel 1 -->
              <button class="control-button" @click="adjustAngle(1, '+')">+</button>
              <!-- Campo para mostrar y modificar el ángulo del panel 1 -->
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
// Importamos las funciones necesarias de Firebase y Vue
import { ref, onMounted } from 'vue';
import { signOut } from "firebase/auth";
import { auth } from '../main'; // Importamos la configuración de autenticación desde main.js
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";

export default {
  name: "PanelPage", // Nombre del componente para su identificación
  setup() {
    // Definimos las variables reactivas que almacenan los valores de voltaje, corriente, potencia y ángulos de los paneles
    const voltage = ref(''); // Valor del voltaje obtenido de Firebase
    const current = ref(''); // Valor de la corriente obtenido de Firebase
    const power = ref('');   // Valor de la potencia obtenido de Firebase
    const angles = ref([0, 0, 0]); // Valores de los ángulos de inclinación de los paneles

    // Inicializamos la conexión con la base de datos de Firebase
    const db = getDatabase();

    // Al montar el componente, leemos los valores de la base de datos y los asignamos a las variables
    onMounted(() => {
      // Leer y actualizar el valor del voltaje
      onValue(dbRef(db, 'voltaje'), (snapshot) => {
        voltage.value = snapshot.val();
      });

      // Leer y actualizar el valor de la corriente
      onValue(dbRef(db, 'corriente'), (snapshot) => {
        current.value = snapshot.val();
      });

      // Leer y actualizar el valor de la potencia
      onValue(dbRef(db, 'potencia'), (snapshot) => {
        power.value = snapshot.val();
      });

      // Leer y actualizar los valores de los ángulos de los paneles
      onValue(dbRef(db, 'angulo'), (snapshot) => {
        angles.value[0] = snapshot.val();
      });
    });

    // Método para actualizar el ángulo de un panel específico en la base de datos
    const updateAngle = (panel) => {
      set(dbRef(db, `angulo`), angles.value[panel - 1]);
    };

    // Método para ajustar el ángulo de inclinación de los paneles, incrementando o disminuyendo el valor
    const adjustAngle = (panel, operation) => {
      if (operation === '+') {
        angles.value[panel - 1]++;
      } else if (operation === '-') {
        angles.value[panel - 1]--;
      }
      updateAngle(panel); // Actualizar el ángulo en la base de datos
    };

    // Método para cerrar sesión del usuario
    const logout = async () => {
      try {
        await signOut(auth); // Cierra sesión usando Firebase Auth
        this.$router.push('/'); // Redirige al usuario a la página de inicio
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    // Retornamos las variables y métodos para que puedan ser utilizados en el template
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
/* Estilos básicos para html y body */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* Estilo para el contenedor de fondo del panel */
.panel-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

/* Contenedor principal del panel */
.panel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
  margin: 0;
}

/* Estilo para la barra superior */
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

/* Estilo de la barra superior */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: 0;
  height: 100%;
  padding: 0;
}

/* Estilo del logo de Espol */
.espol-logo {
  height: 40px;
  margin-left : 30px;
}

/* Estilo de la información de la cuenta */
.account-info {
  display: flex;
  align-items: center;
  color: #000000;
}

/* Estilo del ícono de usuario */
.user-icon {
  height: 30px;
  margin-right: 20px;
}

/* Estilo del botón de cerrar sesión */
.logout-button {
  margin-left: 20px;
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Contenedor de contenido principal */
.content {
  display: flex;
  flex: 1;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
}

/* Estilo de la sección izquierda */
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

/* Estilo de la sección derecha */
.right-section {
  flex: 1;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Separador visual entre las secciones */
.separator {
  width: 2px;
  background-color: #ccc;
  margin: 0;
}

/* Estilo de los encabezados */
h3 {
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-style: italic;
  font-weight: 600; 
  text-decoration: underline;
  margin-bottom: 20px;
  color:#000000;
}

/* Grupo de entrada de datos */
.input-group {
  margin-bottom: 20px;
}

/* Estilo de las etiquetas */
.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}

/* Estilo de los campos de entrada de datos */
.input-group input {
  width: 50%; 
  padding: 2px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ffffff;
}

/* Estilo del botón para ver el histórico de datos */
.history-button {
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

/* Estilo de la vista de la cámara */
.camera-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 190px;
  width: 70%;
  background-color: #000;
  margin-bottom: 20px;
}

/* Estilo de la imagen dentro de la vista de la cámara */
.camera-view img {
  width: 100%;
  height: 100%;
}

/* Grupo de controles */
.control-group {
  display: flex;
  flex-direction: column;
}

/* Estilo de cada control */
.control-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

/* Estilo de los botones de control */
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

/* Estilo de los campos de entrada en el control */
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

/* Estilo del enlace para más información */
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

<template>
  <div>
    <div class="top-bar-background">
      <header class="top-bar">
        <img
          src="@/assets/espol-logo.png"
          alt="Espol Logo"
          class="espol-logo"
        />
        <div class="account-info">
          <!-- <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" /> -->
          <v-btn
            class="button"
            prepend-icon="mdi-account"
            variant="text"
            rounded="xl"
            @click="logout"
          >
            Cerrar Sesión
          </v-btn>
          <!-- <button class="logout-button" @click="logout">Cerrar Sesión</button> -->
        </div>
      </header>
    </div>
    <!-- <v-btn
      color="cyan-lighten-4"
      icon="mdi-arrow-left-bold"
      elevation="4"
      width="40px"
      height="40px"
      class="ml-3 mt-2"
      @click="goBack"
    ></v-btn> -->
    <!-- <button class="back-button" @click="goBack">← Inicio</button> -->
    <v-card>
    <!-- Tabs para navegar entre las páginas -->
    <v-tabs
      v-model="tab"
      align-tabs="center">
      <v-tab :value="1" @click="navigateTo('/initial')">Inicio</v-tab>
      <v-tab :value="2" @click="navigateTo('/tabla')">Tablas y Gráficas</v-tab>
      <v-tab :value="3" @click="navigateTo('/manual')">Manual</v-tab>
      <v-tab :value="4" @click="navigateTo('/info')">Información</v-tab>
    </v-tabs>
  </v-card>
    <div class="content">
      <div class="left-section">
        <h3>Parámetros eléctricos y de funcionamiento Paneles</h3>
        <v-table height="200px" class="table" fixed-header>
          <thead>
            <tr style="box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1)">
              <th class="text-left header-font font-weight-bold">Variable</th>
              <th class="text-left header-font font-weight-bold">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="variable-font">Voltaje</td>
              <td>{{ voltage }}</td>
            </tr>
            <tr>
              <td class="variable-font">Corriente</td>
              <td>{{ current }}</td>
            </tr>
            <tr>
              <td class="variable-font">Potencia</td>
              <td>{{ power }}</td>
            </tr>
            <tr>
              <td class="variable-font">Temperatura</td>
              <td>{{ temperature }}</td>
            </tr>
            <tr>
              <td class="variable-font">Resistencia Interna</td>
              <td>{{ internalResistance }}</td>
            </tr>
            <tr>
              <td class="variable-font">Irradiancia</td>
              <td>{{ irradiance }}</td>
            </tr>
          </tbody>
        </v-table>
        <div class="left-buttons">
          <v-btn
            class="button"
            color="cyan-lighten-4"
            elevation="4"
            rounded="xl"
            @click="goToTablePage"
          >
            Ver Valores
          </v-btn>

          <v-btn
            class="button"
            color="cyan-lighten-4"
            elevation="4"
            rounded="xl"
            @click="guardarValores"
          >
            Guardar Valores
          </v-btn>
        </div>
        <v-alert v-if="successMessage" type="success" elevation="3" class="success-message" dismissible >
          {{ successMessage }}
        </v-alert>
        <!-- <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p> -->
      </div>
      <v-divider
        :thickness="3"
        color="blue-grey-lighten-1"
        vertical
      ></v-divider>
      <div class="right-section">
        <h3>Vista de Cámara</h3>
        <div class="camera-view">
          <img :src="cameraStream" alt="Video Stream" />
        </div>
        <h3 style="margin-top: 20px">Control de Inclinación de Paneles</h3>
        <v-container>
          <!-- Sensor 1- Motor 1 -->
          <v-row class="d-flex align-center justify-center my-2">
            <!-- Botón para incrementar -->
            <v-btn
              color="cyan-lighten-4"
              icon="mdi-plus"
              class="ma-1"
              elevation="4"
              width="40px"
              height="40px"
              @click="adjustAngleFromFirebase('+')"
            ></v-btn>
            <!-- <span class="angulo">{{ angleFromFirebase }}</span> -->
            <v-card
              class="angle-display"
              color="white"
              elevation="3"
              style="
                height: 40px;
                width: 70px;
                min-width: 50px;
                display: flex;
                align-items: center;
              "
              ><v-card-text style="text-align: center">{{
                angleFromFirebase
              }}</v-card-text>
            </v-card>
            <!-- Botón para decrementar -->
            <v-btn
              color="cyan-lighten-4"
              icon="mdi-minus"
              class="ma-1"
              elevation="4"
              width="40px"
              height="40px"
              @click="adjustAngleFromFirebase('-')"
            ></v-btn>
          </v-row>
          <!-- Sensor 2- Motor 2 -->
          <v-row class="d-flex align-center justify-center my-2">
            <!-- Botón para incrementar -->
            <v-btn
              color="cyan lighten-4"
              icon="mdi-plus"
              class="ma-1"
              elevation="4"
              width="40px"
              height="40px"
              @click="adjustAngle1('+')"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <!-- Mostrar valor actual del ángulo usando v-card -->
            <v-card
              class="angle-display"
              color="white"
              elevation="3"
              style="
                height: 40px;
                width: 70px;
                min-width: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <v-card-text style="text-align: center">
                {{ angulo1 }}
              </v-card-text>
            </v-card>
            <!-- Botón para decrementar -->
            <v-btn
              color="cyan lighten-4"
              icon="mdi-minus"
              class="ma-1"
              elevation="4"
              width="40px"
              height="40px"
              @click="adjustAngle1('-')"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-row>
          <!-- Sensor 3- Motor 3 -->
          <v-row class="d-flex align-center justify-center my-2">
            <!-- Botón para incrementar -->
            <v-btn
              color="cyan lighten-4"
              icon="mdi-plus"
              class="ma-1"
              elevation="4"
              width="40px"
              height="40px"
              @click="adjustAngle2('+')"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <!-- Mostrar valor actual del ángulo usando v-card -->
            <v-card
              class="angle-display"
              color="white"
              elevation="3"
              style="
                height: 40px;
                width: 70px;
                min-width: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <v-card-text style="text-align: center">
                {{ angulo2 }}
              </v-card-text>
            </v-card>
            <!-- Botón para decrementar -->
            <v-btn
              color="cyan lighten-4"
              icon="mdi-minus"
              class="ma-1"
              elevation="4"
              width="40px"
              height="40px"
              @click="adjustAngle2('-')"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </div>
      <!-- <div class="control-group">
          <div class="control-item">
            <button
              class="control-button"
              @click="adjustAngleFromFirebase('+')"
            >
              +
            </button>
            <input
              type="number"
              v-model.number="angleFromFirebase"
              @change="updateAngleFromFirebase"
              placeholder="Ángulo panel 1"
              min="0"
              max="25"
            />
            <button
              class="control-button"
              @click="adjustAngleFromFirebase('-')"
            >
              -
            </button>
          </div>
          <div
            class="control-item"
            v-for="(angle, index) in angles"
            :key="index"
          >
            <button class="control-button" @click="adjustAngle(index, '+')">
              +
            </button>
            <input
              type="number"
              v-model.number="angles[index]"
              @change="updateAngle(index)"
              :placeholder="'Ángulo panel ' + (index + 2)"
              min="0"
              max="25"
            />
            <button class="control-button" @click="adjustAngle(index, '-')">
              -
            </button>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";

export default {
  name: "PanelPage",
  setup() {
    const router = useRouter();
    const voltage = ref("");
    const current = ref("");
    const power = ref("");
    const temperature = ref("");
    const internalResistance = ref("");
    const irradiance = ref("");
    const angleFromFirebase = ref(0);
    const angles = ref([0, 0]);
    const isLoading = ref(true);
    const successMessage = ref(null);
    const db = getDatabase();

    // URL pública proporcionada por ngrok
    const cameraStream = ref(
      "https://2840-192-188-59-85.ngrok-free.app/stream"
    ); // Reemplaza con la URL proporcionada por ngrok

    const fetchData = (path, targetRef) => {
      const dataRef = dbRef(db, path);
      onValue(
        dataRef,
        (snapshot) => {
          if (snapshot.exists()) {
            targetRef.value = snapshot.val();
          }
        },
        (error) => {
          console.error("Error fetching data: ", error);
        }
      );
    };

    onMounted(() => {
      fetchData("voltaje", voltage);
      fetchData("corriente", current);
      fetchData("potencia", power);
      fetchData("temperatura", temperature);
      fetchData("resistenciaI", internalResistance);
      fetchData("irradiancia", irradiance);
      fetchData("angulo", angleFromFirebase);
      isLoading.value = false;
    });

    const updateAngleFromFirebase = () => {
      if (angleFromFirebase.value < 0) {
        angleFromFirebase.value = 0;
      } else if (angleFromFirebase.value > 25) {
        angleFromFirebase.value = 25;
      }

      set(dbRef(db, "angulo"), angleFromFirebase.value)
        .then(() => console.log("Angle updated successfully"))
        .catch((error) => console.error("Error updating angle: ", error));
    };

    const adjustAngleFromFirebase = (operation) => {
      if (operation === "+") {
        angleFromFirebase.value = Math.min(25, angleFromFirebase.value + 1);
      } else if (operation === "-") {
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
      if (operation === "+") {
        angles.value[panelIndex] = Math.min(25, angles.value[panelIndex] + 1);
      } else if (operation === "-") {
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
        temperatura: temperature.value,
        resistencia_interna: internalResistance.value,
        irradiancia: irradiance.value,
        fecha: fecha.toLocaleDateString(),
        hora: fecha.toLocaleTimeString(),
      };

      const newRegistroRef = push(dbRef(db, "historicos"));
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
        await remove(dbRef(db, "historicos"));
        await signOut(auth);
        router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    const goToTablePage = () => {
      router.push("/tabla");
    };

    const goBack = () => {
      router.push("/initial");
    };
    const navigateTo = (route) => {
      router.push(route); // Navega a la ruta especificada
    };

    return {
      cameraStream, // Añadido para la transmisión de la cámara
      voltage,
      current,
      power,
      temperature,
      internalResistance,
      irradiance,
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
      goBack,
      navigateTo,
    };
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
  overflow: hidden;
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
  width: 100%;
  margin: 0;
  height: 100%;
  padding: 0;
}

.espol-logo {
  height: 40px;
  margin-left: 30px;
}

.button {
  font-size: 12px !important;
}

.content {
  display: flex;
  flex: 1;
  height: calc(100vh - 100px);
  justify-content: space-evenly;
}
.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.table {
  width: 300px;
  max-width: 600px;
}
h3 {
  font-size: 20px;
  width: 90%;
  margin-bottom: 5px;
  margin-top: 10px;
  text-align: center;
}
.header-font {
  font-size: 14px;
}
.variable-font {
  font-size: 14px;
  font-weight: 400;
}
.left-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: 900px;
  margin-top: 1px;
}
/* .save-button {
  padding: 0px;
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 180px;
  height: 35px;
  margin: 30px auto;
}

.save-button:hover {
  background-color: #95cfc92d;
}
.history-button {
  padding: 0px;
  background-color: transparent;
  color: #1e2d36b9;
  border: transparent;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 180px;
  height: 35px;
  margin: 0px auto;
  text-decoration: underline;
}
.history-button:hover {
  color: #000000d7;
} */

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.camera-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 190px;
  width: 60%;
  max-width: 350px;
  background-color: #000;
}

.camera-view img {
  width: 100%;
  height: 100%;
}

.success-message {
  position: absolute; /* Posiciona el mensaje sobre el contenedor */
  top: 0; /* Posición en la parte superior del contenedor */
  left: 50%; /* Centra horizontalmente */
  transform: translateX(-50%); /* Ajusta para centrar exactamente el mensaje */
  z-index: 1000; /* Coloca el mensaje sobre otros elementos */
}
</style>



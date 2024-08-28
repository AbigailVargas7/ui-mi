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
            class="button-out"
            prepend-icon="mdi-account"
            variant="text"
            rounded="xl"
            @click="logout"
            >Cerrar Sesión
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
    <!-- <v-tooltip v-tooltip text="Volver a inicio">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          color="cyan-lighten-4"
          icon="mdi-arrow-left-bold"
          elevation="4"
          width="40px"
          height="40px"
          class="ml-3 mt-2"
          @click="goBack"
        >
        </v-btn>
      </template>
    </v-tooltip>
 -->
    <v-card>
      <!-- Tabs para navegar entre las páginas -->
      <v-tabs v-model="tab" align-tabs="center">
        <v-tab :value="1" @click="navigateTo('/initial')">Inicio</v-tab>
        <v-tab :value="2" @click="navigateTo('/panel')"
          >Panel de Monitoreo</v-tab
        >
        <v-tab :value="3" @click="navigateTo('/manual')">Manual</v-tab>
        <v-tab :value="4" @click="navigateTo('/info')">Información</v-tab>
      </v-tabs>
    </v-card>
    <div class="content">
      <!-- <div id="print-section"> -->
      <div class="tabla">
        <!-- Contenedor que agrupa la tabla y los gráficos -->
        <h3>Registro de Datos</h3>
        <v-row class="button-1">
          <v-btn
            class="button"
            color="cyan-lighten-4"
            elevation="4"
            rounded="xl"
            @click="vaciarTabla"
          >
            Borrar Tabla
          </v-btn>
          <!-- <v-btn
            class="button"
            color="cyan-lighten-4"
            elevation="4"
            rounded="xl"
            @click="goToMonitoringPanel"
          >
            Volver a Panel
          </v-btn> -->
        </v-row>
        <!-- <button @click="vaciarTabla" class="empty-button">Vaciar Tabla</button> -->
        <h3 v-if="!registros.length" class="empty-message">
          No hay datos para mostrar.
        </h3>
        <!-- TABLAS -->
        <table v-if="registros.length" class="data-table">
          <thead>
            <tr>
              <th>Ángulo</th>
              <th>Voltaje</th>
              <th>Corriente</th>
              <th>Potencia</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(registro, index) in registros" :key="index">
              <td>{{ registro.angulo }}</td>
              <td>{{ registro.voltaje }}</td>
              <td>{{ registro.corriente }}</td>
              <td>{{ registro.potencia }}</td>
              <td>{{ registro.fecha }}</td>
              <td>{{ registro.hora }}</td>
              <td>
                <v-btn
                  class="button"
                  color="red-lighten-3"
                  elevation="4"
                  @click="remove(index)"
                >
                  Eliminar
                </v-btn>
                <!-- <button @click="remove(index)" class="remove-button"> -->
                <!-- Eliminar -->
                <!-- </button> -->
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Botones para generar y limpiar gráficos -->
        <div class="graph-controls">
          <v-btn
            class="button"
            color="cyan-lighten-4"
            elevation="4"
            rounded="xl"
            @click="generarGraficos"
          >
            Generar Gráficos
          </v-btn>
          <v-btn
            class="button"
            color="cyan-lighten-4"
            elevation="4"
            rounded="xl"
            @click="limpiarGraficos"
          >
            Limpiar Gráficos
          </v-btn>
        </div>

        <!-- Gráficos de líneas usando Chart.js -->
        <div
          v-if="chartsGenerated && areChartsDataValid"
          class="charts-container"
        >
          <canvas
            id="voltajeChart"
            width="100%"
            max-width="150px"
            height="125"
          ></canvas>
          <canvas
            id="corrienteChart"
            width="100%"
            max-width="150px"
            height="125"
          ></canvas>
          <canvas
            id="potenciaChart"
            width="100%"
            max-width="150px"
            height="125"
          ></canvas>
        </div>
      </div>
      <v-row class="buttons">
        <v-btn
          class="button"
          color="cyan-lighten-4"
          elevation="4"
          rounded="xl"
          @click="imprimirPagina"
        >
          Imprimir Página
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref as dbRef, onValue, remove } from "firebase/database";

export default {
  name: "TablaPage",
  setup() {
    const router = useRouter();
    const registros = ref([]);
    const chartsGenerated = ref(false);
    let voltajeChartInstance = null;
    let corrienteChartInstance = null;
    let potenciaChartInstance = null;

    const fetchRegistros = () => {
      const db = getDatabase();
      const registrosRef = dbRef(db, "historicos/");
      onValue(
        registrosRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            registros.value = Object.values(data);
            if (chartsGenerated.value) {
              actualizarDatosGraficos();
            }
          } else {
            registros.value = [];
            limpiarGraficos(); // Limpiar gráficos si no hay datos
          }
        },
        (error) => {
          console.error("Error fetching data: ", error);
        }
      );
    };

    const actualizarDatosGraficos = () => {
      nextTick(() => {
        const labels = registros.value.map((r) => r.angulo);
        const voltajeData = registros.value.map((r) => r.voltaje);
        const corrienteData = registros.value.map((r) => r.corriente);
        const potenciaData = registros.value.map((r) => r.potencia);

        // Destruir las instancias previas de los gráficos si existen, para evitar superposiciones
        if (voltajeChartInstance) voltajeChartInstance.destroy();
        if (corrienteChartInstance) corrienteChartInstance.destroy();
        if (potenciaChartInstance) potenciaChartInstance.destroy();

        // Gráfico de Voltaje vs Ángulo
        const voltajeCtx = document
          .getElementById("voltajeChart")
          .getContext("2d");
        voltajeChartInstance = new Chart(voltajeCtx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Voltaje",
                data: voltajeData,
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
                tension: 0.1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Voltaje vs Ángulo",
                font: {
                  size: 16,
                },
              },
              legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Ángulo",
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Voltaje (V)",
                  font: {
                    size: 14,
                  },
                },
              },
            },
          },
        });

        // Gráfico de Corriente vs Ángulo
        const corrienteCtx = document
          .getElementById("corrienteChart")
          .getContext("2d");
        corrienteChartInstance = new Chart(corrienteCtx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Corriente",
                data: corrienteData,
                borderColor: "rgba(54, 162, 235, 1)",
                fill: false,
                tension: 0.1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Corriente vs Ángulo",
                font: {
                  size: 16,
                },
              },
              legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Ángulo",
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Corriente (mA)",
                  font: {
                    size: 14,
                  },
                },
              },
            },
          },
        });

        // Gráfico de Potencia vs Ángulo
        const potenciaCtx = document
          .getElementById("potenciaChart")
          .getContext("2d");
        potenciaChartInstance = new Chart(potenciaCtx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Potencia",
                data: potenciaData,
                borderColor: "rgba(255, 206, 86, 1)",
                fill: false,
                tension: 0.1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Potencia vs Ángulo",
                font: {
                  size: 16,
                },
              },
              legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Ángulo",
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Potencia (W)",
                  font: {
                    size: 14,
                  },
                },
              },
            },
          },
        });
      });
    };

    const generarGraficos = () => {
      chartsGenerated.value = true;
      actualizarDatosGraficos();
    };

    const limpiarGraficos = () => {
      chartsGenerated.value = false;
      if (voltajeChartInstance) voltajeChartInstance.destroy();
      if (corrienteChartInstance) voltajeChartInstance.destroy();
      if (potenciaChartInstance) potenciaChartInstance.destroy();
    };

    onMounted(() => {
      fetchRegistros();
    });

    const removeItem = async (index) => {
      const db = getDatabase();
      const key = Object.keys(registros.value)[index];
      try {
        await remove(dbRef(db, `historicos/${key}`));
        registros.value.splice(index, 1); // Remover el elemento de la tabla localmente
        if (chartsGenerated.value) {
          actualizarDatosGraficos(); // Actualizar gráficos después de eliminar
        }
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
      }
    };

    const vaciarTabla = async () => {
      const db = getDatabase();
      try {
        await remove(dbRef(db, "historicos"));
        registros.value = [];
        limpiarGraficos(); // Limpiar gráficos cuando se vacía la tabla
      } catch (error) {
        console.error("Error al vaciar la tabla:", error);
      }
    };

    const imprimirPagina = () => {
      window.print();
    };

    const logout = async () => {
      try {
        const db = getDatabase();
        await remove(dbRef(db, "historicos")); // Eliminar todos los registros
        await signOut(auth);
        router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    const goBack = () => {
      router.push("/initial");
    };
    const goToMonitoringPanel = () => {
      router.push("/panel");
    };

    const navigateTo = (route) => {
      router.push(route); // Navega a la ruta especificada
    };
    const areChartsDataValid = computed(() => {
      return registros.value.length > 0;
    });

    return {
      registros,
      chartsGenerated,
      generarGraficos,
      limpiarGraficos,
      areChartsDataValid,
      imprimirPagina,
      logout,
      goBack,
      vaciarTabla,
      remove: removeItem,
      goToMonitoringPanel,
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
  margin-top: 0px; /* Espacio debajo de la barra fija */
  width: 100%;
  margin: 10px;
  padding-top: 0px;
}

.tabla {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 10px 40px;
  border-radius: 8px;
  margin-bottom: 20px;
}
h3 {
  font-size: 30px;
  width: 90%;
  margin-bottom: 1px;
  margin-top: 1px;
  text-align: center;
}
.buttons {
  display: flex;
  width: 100%;
  padding: 10px 40px;
    border-radius: 8px;
    margin-bottom: 20px;
}
.button-1 {
  display: flex;
  width: 100%;
}
.button-out {
  font-size: 12px !important;
}
.button {
  padding: 10px 20px;
  margin: 15px;
}
.data-table {
  width: 90%;
  border-collapse: collapse;
  min-width: 400px;
  text-align: center;
  margin: 15px;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.data-table th {
  background-color: #f2f2f2;
  color: #333;
}
.empty-message {
  font-weight: bold;
  color: #ff4d4d;
  margin-bottom: 20px;
}
.charts-container {
  display: flex;
  flex-direction: row;
  max-width: 33%;
  justify-content: center;
  align-items: center;
  align-items: center;
  margin-top: 20px;
}
.graph-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
<template>
  <div class="tabla-page-container">
    <div class="top-bar-background">
      <header class="top-bar">
        <img src="@/assets/espol-logo.png" alt="Espol Logo" class="espol-logo" />
        <div class="account-info">
          <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" />
          <button class="logout-button" @click="logout">Cerrar Sesión</button>
        </div>
      </header>
    </div>
    <div class="content-wrapper">
      <button class="back-button" @click="goBack">← Regresar</button>
      <div id="print-section"> <!-- Contenedor que agrupa la tabla y los gráficos -->
        <h1>Registro de Datos</h1>
        <button @click="vaciarTabla" class="empty-button">Vaciar Tabla</button>
        <p v-if="!registros.length" class="empty-message">No hay datos para mostrar.</p>
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
                <button @click="remove(index)" class="remove-button">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Botones para generar y limpiar gráficos -->
        <div class="graph-controls">
          <button @click="generarGraficos" class="generate-button">Generar Gráficos</button>
          <button @click="limpiarGraficos" class="clear-button">Limpiar Gráficos</button>
        </div>

        <!-- Gráficos de líneas usando Chart.js -->
        <div v-if="chartsGenerated && areChartsDataValid" class="charts-container">
          <canvas id="voltajeChart" width="400" height="200"></canvas>
          <canvas id="corrienteChart" width="400" height="200"></canvas>
          <canvas id="potenciaChart" width="400" height="200"></canvas>
        </div>
      </div>
      <button @click="imprimirPagina" class="print-button">Imprimir Página</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
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
      const registrosRef = dbRef(db, 'historicos/');
      onValue(registrosRef, (snapshot) => {
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
      }, (error) => {
        console.error("Error fetching data: ", error);
      });
    };

    const actualizarDatosGraficos = () => {
      nextTick(() => {
        const labels = registros.value.map(r => r.angulo);
        const voltajeData = registros.value.map(r => r.voltaje);
        const corrienteData = registros.value.map(r => r.corriente);
        const potenciaData = registros.value.map(r => r.potencia);

        // Destruir las instancias previas de los gráficos si existen, para evitar superposiciones
        if (voltajeChartInstance) voltajeChartInstance.destroy();
        if (corrienteChartInstance) corrienteChartInstance.destroy();
        if (potenciaChartInstance) potenciaChartInstance.destroy();

        // Gráfico de Voltaje vs Ángulo
        const voltajeCtx = document.getElementById('voltajeChart').getContext('2d');
        voltajeChartInstance = new Chart(voltajeCtx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Voltaje',
              data: voltajeData,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
              tension: 0.1
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Voltaje vs Ángulo'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Ángulo'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Voltaje (V)'
                }
              }
            }
          }
        });

        // Gráfico de Corriente vs Ángulo
        const corrienteCtx = document.getElementById('corrienteChart').getContext('2d');
        corrienteChartInstance = new Chart(corrienteCtx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Corriente',
              data: corrienteData,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
              tension: 0.1
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Corriente vs Ángulo'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Ángulo'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Corriente (mA)'
                }
              }
            }
          }
        });

        // Gráfico de Potencia vs Ángulo
        const potenciaCtx = document.getElementById('potenciaChart').getContext('2d');
        potenciaChartInstance = new Chart(potenciaCtx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Potencia',
              data: potenciaData,
              borderColor: 'rgba(255, 206, 86, 1)',
              fill: false,
              tension: 0.1
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Potencia vs Ángulo'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Ángulo'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Potencia (W)'
                }
              }
            }
          }
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
      if (corrienteChartInstance) corrienteChartInstance.destroy();
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
        await remove(dbRef(db, 'historicos'));
        registros.value = [];
        limpiarGraficos();
      } catch (error) {
        console.error("Error al vaciar la tabla:", error);
      }
    };

    const imprimirPagina = () => {
      const printContents = document.getElementById("print-section").innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
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

    const goBack = () => {
      router.push('/initial');
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
      remove: removeItem
    };
  }
};
</script>

<style scoped>
/* Ajustar los estilos para que coincidan con PanelPage */

.top-bar-background {
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, rgba(0, 210, 246, 0.4) 0%, rgba(138, 174, 229, 0.4) 17%, rgba(29, 162, 186, 0.4) 40%, rgba(103, 218, 239, 0.4) 60%, rgba(169, 242, 255, 0.4) 75%, rgba(29, 162, 186, 0.4) 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 0;
  height: 100%;
}

.espol-logo {
  height: 40px;
}

.account-info {
  display: flex;
  align-items: center;
  color: #000000;
}

.user-icon {
  height: 30px;
  margin-right: 10px;
}

.logout-button {
  background-color: transparent;
  color: #000000;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 120px;
  height: 35px;
  transition: background-color 0.3s, color 0.3s;
}

.logout-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #000000;
}

.content-wrapper {
  margin-top: 80px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.back-button {
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  width: 120px;
  height: 35px;
  margin: 20px 0;
}

#print-section { /* Contenedor para tabla y gráficos */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.empty-button, .generate-button, .clear-button, .print-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.empty-button:hover, .generate-button:hover, .clear-button:hover, .print-button:hover {
  background-color: #0056b3;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th, .data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.data-table th {
  background-color: #f2f2f2;
  color: #333;
}

.charts-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

.empty-message {
  font-weight: bold;
  color: #ff4d4d;
  margin-bottom: 20px;
}

.remove-button {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #d43f3f;
}

.graph-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>

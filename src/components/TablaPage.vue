<template>
  <div class="page-container">
    <div class="sec-container">
      <div class="top-bar-background">
        <header class="top-bar">
          <img src="@/assets/espol-logo.png" alt="Espol Logo" class="espol-logo" />
          <div class="account-info">
            <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" />
            <button @click="logout" class="logout-button">Cerrar Sesión</button>
          </div>
        </header>
    </div>
    <div class="box-container">
      <button @click="goToPanelPage" class="back-button">← Inicio</button>   
      <div class="tabla-page-container">
        <!-- Botón de inicio -->
        <h1>Registro de Datos</h1>
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
          <button @click="generarGraficos" class="generate-button">Generar Gráfico</button>
          <button @click="limpiarGraficos" class="clear-button">Limpiar Gráficos</button>
          <button @click="vaciarTabla" class="empty-button">Vaciar Tabla</button>

        </div>

        <div v-if="areChartsDataValid" class="charts-container">
          <line-chart :chart-data="corrienteData" title="Corriente vs Tiempo"></line-chart>
          <line-chart :chart-data="voltajeData" title="Voltaje vs Tiempo"></line-chart>
          <line-chart :chart-data="potenciaData" title="Potencia vs Tiempo"></line-chart>
        </div>

        <button @click="imprimirPagina" class="print-button">Imprimir Página</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import LineChart from '@/components/LineChart.vue';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { getDatabase, ref as dbRef, onValue, remove } from "firebase/database";

export default {
  name: "TablaPage",
  components: {
    LineChart
  },
  setup() {
    const router = useRouter();
    const registros = ref([]);

    // Generar labels para 3600 segundos
    const timeLabels = Array.from({ length: 3600 }, (_, i) => i + 1);

    const corrienteData = ref({
      labels: [...timeLabels],
      datasets: [{ label: "Corriente", backgroundColor: "#42A5F5", data: [] }]
    });

    const voltajeData = ref({
      labels: [...timeLabels],
      datasets: [{ label: "Voltaje", backgroundColor: "#66BB6A", data: [] }]
    });

    const potenciaData = ref({
      labels: [...timeLabels],
      datasets: [{ label: "Potencia", backgroundColor: "#FFA726", data: [] }]
    });

    const maxDataPoints = 3600;

    const updateChartData = (chartData, registros) => {
      chartData.value.datasets[0].data = [];
      registros.forEach((registro, index) => {
        if (index < maxDataPoints) {
          chartData.value.datasets[0].data.push(registro);
        }
      });
    };

    const fetchRegistros = () => {
      const db = getDatabase();
      const registrosRef = dbRef(db, 'historicos/');
      onValue(registrosRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          registros.value = Object.values(data);
        } else {
          registros.value = [];
        }
      }, (error) => {
        console.error("Error fetching data: ", error);
      });
    };

    const generarGraficos = () => {
      updateChartData(corrienteData, registros.value.map(r => r.corriente));
      updateChartData(voltajeData, registros.value.map(r => r.voltaje));
      updateChartData(potenciaData, registros.value.map(r => r.potencia));
    };

    const limpiarGraficos = () => {
      corrienteData.value.datasets[0].data = [];
      voltajeData.value.datasets[0].data = [];
      potenciaData.value.datasets[0].data = [];
    };

    onMounted(() => {
      fetchRegistros();
    });

    const removeItem = async (index) => {
      const db = getDatabase();
      const key = Object.keys(registros.value)[index];
      try {
        await remove(dbRef(db, `historicos/${key}`));
        registros.value.splice(index, 1);
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
      window.print();
    };

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    const goToPanelPage = () => {
      router.push('/panel');
    };

    const areChartsDataValid = computed(() => {
      return (
        corrienteData.value.datasets[0].data.length > 0 ||
        voltajeData.value.datasets[0].data.length > 0 ||
        potenciaData.value.datasets[0].data.length > 0
      );
    });

    return {
      registros,
      corrienteData,
      voltajeData,
      potenciaData,
      generarGraficos,
      limpiarGraficos,
      areChartsDataValid,
      imprimirPagina,
      logout,
      goToPanelPage,
      vaciarTabla,
      remove: removeItem
    };
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

.page-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sec-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 100%;
}

.tabla-page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5px 20px;
  box-sizing: border-box;
  overflow-y: auto;
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
  margin-right: 5px;
}

.logout-button {
  margin-left: 5px;
  background-color: transparent;
  color: #000000;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 118px;
  height: 35px;
  transition: background-color 0.3s, color 0.3s;
}

.logout-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #000000;
}

.back-button {
  padding: 0px;
  background-color: white;
  color: #23a6f0;
  border: 2px solid #23a6f0;
  border-radius: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  width: 100px;
  height: 40px;
  margin: 20px 0;
  text-align: center;
  float: left; 
  margin:20px ;
}

.empty-button {
  margin: 10px 0;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: left; 
  margin-left: 10px;

}

.empty-button:hover {
  background-color: #d43f3f;
}

.print-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.print-button:hover {
  background-color: #218838;
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
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
}

.line-chart {
  width: 30%;
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

.generate-button, .clear-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.generate-button:hover, .clear-button:hover {
  background-color: #0056b3;
}

.graph-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>

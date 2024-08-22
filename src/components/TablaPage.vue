<template>
  <div class="tabla-page-container">
    <header class="top-bar">
      <button @click="logout" class="logout-button">Cerrar Sesión</button>
      <button @click="goToPanelPage" class="back-button">Regresar</button>
    </header>
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
      <button @click="generarGraficos" class="generate-button">Generar Gráfico</button>
      <button @click="limpiarGraficos" class="clear-button">Limpiar Gráficos</button>
    </div>

    <div v-if="areChartsDataValid" class="charts-container">
      <line-chart :chart-data="corrienteData" title="Corriente vs Tiempo"></line-chart>
      <line-chart :chart-data="voltajeData" title="Voltaje vs Tiempo"></line-chart>
      <line-chart :chart-data="potenciaData" title="Potencia vs Tiempo"></line-chart>
    </div>

    <button @click="imprimirPagina" class="print-button">Imprimir Página</button>
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
      labels: [...timeLabels], // Asignamos labels como un array con 3600 segundos
      datasets: [{ label: "Corriente", backgroundColor: "#42A5F5", data: [] }]
    });

    const voltajeData = ref({
      labels: [...timeLabels], // Asignamos labels como un array con 3600 segundos
      datasets: [{ label: "Voltaje", backgroundColor: "#66BB6A", data: [] }]
    });

    const potenciaData = ref({
      labels: [...timeLabels], // Asignamos labels como un array con 3600 segundos
      datasets: [{ label: "Potencia", backgroundColor: "#FFA726", data: [] }]
    });

    const maxDataPoints = 3600;

    const updateChartData = (chartData, registros) => {
      chartData.value.datasets[0].data = []; // Limpiamos los datos anteriores

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
        registros.value.splice(index, 1); // Remover el elemento de la tabla localmente
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
      }
    };

    const vaciarTabla = async () => {
      const db = getDatabase();
      try {
        await remove(dbRef(db, 'historicos'));
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
.tabla-page-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.logout-button, .back-button, .empty-button {
  margin-right: 10px;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover, .back-button:hover, .empty-button:hover {
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

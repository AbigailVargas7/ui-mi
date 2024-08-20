<template>
  <div class="tabla-page-container">
    <header class="top-bar">
      <button @click="logout" class="logout-button">Cerrar Sesión</button>
      <button @click="goToPanelPage" class="back-button">Regresar</button>
    </header>
    <h1>Registro de Datos</h1>
    <table class="data-table">
      <thead>
        <tr>
          <th>Ángulo</th>
          <th>Voltaje</th>
          <th>Corriente</th>
          <th>Potencia</th>
          <th>Fecha</th>
          <th>Hora</th>
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
        </tr>
      </tbody>
    </table>

    <div class="charts-container">
      <line-chart :chart-data="corrienteData" title="Corriente vs Tiempo"></line-chart>
      <line-chart :chart-data="voltajeData" title="Voltaje vs Tiempo"></line-chart>
      <line-chart :chart-data="potenciaData" title="Potencia vs Tiempo"></line-chart>
    </div>

    <button @click="imprimirPagina" class="print-button">Imprimir Página</button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { onValue, ref as dbRef } from "firebase/database";
import { auth } from '../firebase';
import { db } from '../firebase';
import LineChart from '@/components/LineChart.vue';
import { signOut } from "firebase/auth";

export default {
  name: "TablaPage",
  components: {
    LineChart
  },
  setup() {
    const router = useRouter();
    const registros = ref([]);
    const corrienteData = ref({
      labels: [],
      datasets: [{ label: "Corriente", backgroundColor: "#42A5F5", data: [] }]
    });
    const voltajeData = ref({
      labels: [],
      datasets: [{ label: "Voltaje", backgroundColor: "#66BB6A", data: [] }]
    });
    const potenciaData = ref({
      labels: [],
      datasets: [{ label: "Potencia", backgroundColor: "#FFA726", data: [] }]
    });

    const maxDataPoints = 10;

    const updateChartData = (chartData, newData) => {
      if (chartData.value.datasets[0].data.length >= maxDataPoints) {
        chartData.value.datasets[0].data.shift();
        chartData.value.labels.shift();
      }
      chartData.value.datasets[0].data.push(newData);
      chartData.value.labels.push(new Date().toLocaleTimeString());
    };

    const cargarDatosFirebase = () => {
      const voltajeRef = dbRef(db, 'voltaje');
      const corrienteRef = dbRef(db, 'corriente');
      const potenciaRef = dbRef(db, 'potencia');

      onValue(voltajeRef, (snapshot) => {
        if (snapshot.exists()) {
          updateChartData(voltajeData, snapshot.val());
        }
      });

      onValue(corrienteRef, (snapshot) => {
        if (snapshot.exists()) {
          updateChartData(corrienteData, snapshot.val());
        }
      });

      onValue(potenciaRef, (snapshot) => {
        if (snapshot.exists()) {
          updateChartData(potenciaData, snapshot.val());
        }
      });
    };

    const handleGuardarRegistro = (event) => {
      registros.value.push(event.detail);
    };

    onMounted(() => {
      window.addEventListener('guardarRegistro', handleGuardarRegistro);
      cargarDatosFirebase();
    });

    onUnmounted(() => {
      window.removeEventListener('guardarRegistro', handleGuardarRegistro);
    });

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

    return {
      registros,
      corrienteData,
      voltajeData,
      potenciaData,
      imprimirPagina,
      logout,
      goToPanelPage,
    };
  }
};
</script>

<style scoped>
.tabla-page-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.logout-button, .back-button {
  margin-right: 10px;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover, .back-button:hover {
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
</style>

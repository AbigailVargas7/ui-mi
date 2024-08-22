<template>
  <div>
    <h3>{{ title }}</h3>
    <Line :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: this.title
          }
        }
      };
    }
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
  margin-bottom: 10px;
}
</style>

<template>
    <div>
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js/auto';
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  
  export default {
    name: 'LineChart',
    props: {
      chartData: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const lineChartRef = ref(null);
      let chartInstance = null;
  
      const createChart = () => {
        if (lineChartRef.value) {
          chartInstance = new Chart(lineChartRef.value.getContext('2d'), {
            type: 'line',
            data: props.chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: props.title
                },
                legend: {
                  display: true,
                  position: 'top'
                }
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'second'
                  },
                  title: {
                    display: true,
                    text: 'Tiempo'
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Valor'
                  }
                }
              }
            }
          });
        }
      };
  
      // Recreate the chart if the chartData prop changes
      watch(() => props.chartData, () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
        createChart();
      }, { deep: true });
  
      onMounted(() => {
        createChart();
      });
  
      // Destroy the chart when the component is unmounted
      onBeforeUnmount(() => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      });
  
      return {
        lineChartRef
      };
    }
  };
  </script>
  
  <style scoped>
  div {
    position: relative;
    height: 400px;
    width: 100%;
  }
  </style>
  
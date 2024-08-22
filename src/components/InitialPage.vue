<template>
  <div class="page-container">
    <!-- Barra superior -->
    <header class="header-bar">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <div class="header-title">Teleoperación de Equipo Solar</div>
      <button class="header-button">Cerrar sesión</button>
    </header>

    <!-- Contenido principal -->
    <div class="content-container">
      <img src="@/assets/solar-background.jpg" alt="Solar Background" class="background-image" />

      <div class="content-box">
        <div class="panel" @click="goTo('monitoring')">Panel de Monitoreo</div>
        <div class="panel" @click="goTo('graphs')">Gráficas y Tablas</div>
        <div class="panel" @click="goTo('manual')">Manual de Uso</div>
        <div class="panel" @click="goTo('system-info')">Información del Sistema</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const goTo = (section) => {
      router.push(`/${section}`);
    };

    return {
      goTo
    };
  }
}
</script>

<style scoped>
/* Estilos para el contenedor general de la página */
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Estilos para la barra superior */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0B74E7;
  color: white;
  font-family: Arial, sans-serif;
}

.header-bar .logo {
  height: 50px;
}

.header-bar .header-title {
  font-size: 24px;
  font-weight: bold;
}

.header-bar .header-button {
  background-color: white;
  color: #0B74E7;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.header-bar .header-button:hover {
  background-color: #f0f0f0;
}

/* Estilos para el contenedor principal */
.content-container {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Imagen de fondo */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Estilo para el cuadro de contenido */
.content-box {
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
}

/* Estilos para los paneles interactivos */
.panel {
  flex: 1;
  margin: 0 10px;
  padding: 20px;
  background-color: #F28B82;
  color: white;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.panel:hover {
  background-color: #E57373;
}

/* Estilos para el texto dentro de los paneles */
.panel:nth-child(2) {
  background-color: #F0A202;
}

.panel:nth-child(3) {
  background-color: #F2B134;
}

.panel:nth-child(4) {
  background-color: #F28B82;
}
</style>

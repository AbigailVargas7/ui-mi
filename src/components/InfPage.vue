<template>
  <div class="panel-back">
    <div class="panel-container">
      <!-- Barra superior con logo y botón de cierre de sesión -->
      <div class="top-bar-background">
        <header class="top-bar">
          <img src="@/assets/espol-logo.png" alt="Espol Logo" class="espol-logo" />
          <div class="account-info">
            <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" />
            <button class="logout-button" @click="logout">Cerrar Sesión</button>
          </div>
        </header>
      </div>
      
      <!-- Contenido principal -->
      <div class="content">
        <h1 class="page-title">Sistema de Generación de Energía On-Grid</h1>
        <p class="description">
          Un sistema de generación de energía on-grid está conectado a la red eléctrica pública. Estos sistemas permiten que la energía generada por paneles solares se utilice directamente en la red, proporcionando energía adicional o vendiendo el exceso de energía.
        </p>
        <p class="description">
          A continuación, se proporcionan los documentos técnicos y manuales de usuario para los inversores y paneles solares utilizados en este sistema:
        </p>
        
        <div class="pdf-links">
          <div class="pdf-item">
            <img src="@/assets/inversor-icon.png" alt="Inversor Icon" class="pdf-icon" />
            <a :href="pdfInversorDatasheet" target="_blank" class="pdf-link">Descargar Datasheet del Inversor</a>
          </div>
          <div class="pdf-item">
            <img src="@/assets/grid-icon.png" alt="Grid Icon" class="pdf-icon" />
            <a :href="pdfPanelesDatasheet" target="_blank" class="pdf-link">Descargar Datasheet de los Paneles</a>
          </div>
          <div class="pdf-item">
            <img src="@/assets/ahorros-icon.png" alt="Ahorros Icon" class="pdf-icon" />
            <a :href="pdfInversorManual" target="_blank" class="pdf-link">Descargar Manual de Usuario del Inversor</a>
          </div>
          <div class="pdf-item">
            <img src="@/assets/grid-icon.png" alt="Grid Icon" class="pdf-icon" />
            <a :href="pdfPanelesManual" target="_blank" class="pdf-link">Descargar Manual de Usuario de los Paneles</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pdfInversorDatasheet from '@/assets/Inversor_Datasheet.pdf';
import pdfPanelesDatasheet from '@/assets/Paneles_Datasheet.pdf';
import pdfInversorManual from '@/assets/Inversor_Manual_Usuario.pdf';
import pdfPanelesManual from '@/assets/Paneles_Manual_Usuario.pdf';

export default {
  name: "SystemInfoPage",
  setup() {
    return {
      pdfInversorDatasheet,
      pdfPanelesDatasheet,
      pdfInversorManual,
      pdfPanelesManual,
    };
  },
  methods: {
    logout() {
      this.$router.push('/');
    }
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

.panel-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.panel-container {
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
  margin: 0 auto;
  height: 100%;
  padding: 0;
}

.espol-logo {
  height: 40px;
  margin-left: 30px;
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

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: auto;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.description {
  font-size: 16px;
  text-align: center;
  max-width: 800px;
  margin-bottom: 20px;
}

.pdf-links {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pdf-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.pdf-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.pdf-link {
  font-size: 16px;
  color: #23a6f0;
  text-decoration: none;
}

.pdf-link:hover {
  color: #1e90ff;
}
</style>

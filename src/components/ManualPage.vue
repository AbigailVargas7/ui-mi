<template>
  <div >
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
          >
            Cerrar Sesión
          </v-btn>
          <!-- <button class="logout-button" @click="logout">Cerrar Sesión</button> -->
        </div>
      </header>
    </div>
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
    </v-tooltip> -->
    <v-card>
      <!-- Tabs para navegar entre las páginas -->
      <v-tabs v-model="tab" align-tabs="center">
        <v-tab :value="1" @click="navigateTo('/initial')">Inicio</v-tab>
        <v-tab :value="2" @click="navigateTo('/panel')"
          >Panel de Monitoreo</v-tab>
        <v-tab :value="3" @click="navigateTo('/tabla')">Tablas y Gráficas</v-tab>
        <v-tab :value="4" @click="navigateTo('/info')">Información</v-tab>
      </v-tabs>
    </v-card>
    
    
    <!-- Descripción general de la página -->
    <div class="page-description">
      En esta sección se explicará cada parte del panel de monitoreo y qué
      representa.
    </div>

    <!-- Contenido principal de la página -->
    <div class="content">
      <!-- Primer cuadro rojo con descripción -->
      <div class="section-container top-left">
        <div class="red-box">
          <img
            src="@/assets/imagen-1.png"
            alt="Criterios y Parámetros Eléctricos de Inversor"
            class="section-image"
          />
        </div>
        <p class="section-description">
          Criterios y Parámetros Eléctricos de Inversor
        </p>
        <p class="info-description">
          En este primer recuadro se muestran en tiempo real, los valores
          importantes recolectados del inversor, así como el total de todos los
          paneles conectados.
        </p>
      </div>

      <!-- Segundo cuadro rojo con descripción -->
      <div class="section-container bottom-left">
        <div class="red-box">
          <img
            src="@/assets/imagen-2.png"
            alt="Guardar Datos"
            class="section-image"
          />
        </div>
        <p class="section-description">Guardar Datos</p>
        <p class="info-description">
          En este botón se guardan los parámetros del inversor y ángulos de
          inclinación, pueden usarse para gráficas.
        </p>
      </div>

      <!-- Tercer cuadro rojo con descripción -->
      <div class="section-container top-right">
        <div class="red-box">
          <img
            src="@/assets/imagen-3.png"
            alt="Vista de Cámara"
            class="section-image"
          />
        </div>
        <p class="section-description">Vista de Cámara</p>
        <p class="info-description">
          En esta vista se puede apreciar en tiempo real el video de los paneles
          solares, como forma de comprobar el funcionamiento.
        </p>
      </div>

      <!-- Cuarto cuadro rojo con descripción -->
      <div class="section-container bottom-right">
        <div class="red-box">
          <img
            src="@/assets/imagen-4.png"
            alt="Control de Inclinación de Paneles"
            class="section-image"
          />
        </div>
        <p class="section-description">Control de Inclinación de Paneles</p>
        <p class="info-description">
          Esta es la sección donde se controla la inclinación de los paneles.
          Puedes subir y bajar usando los botones + y -. Se observan los ángulos
          ajustados en grados.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default {
  name: "ManualPage",
  setup() {
    const router = useRouter();

    const logout = async () => {
      try {
        await signOut(auth);
        router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión: ", error);
      }
    };

    const goBack = () => {
      router.push("/initial");
    };
    const navigateTo = (route) => {
      router.push(route); // Navega a la ruta especificada
    };
    return {
      logout,
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
  font-family: "Montserrat", sans-serif;
}

.button-out {
  font-size: 12px !important;
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
  margin: 0 auto;
  height: 100%;
  padding: 0;
}

.espol-logo {
  height: 40px;
  margin-left: 30px;
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

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow: auto;
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
}

.page-description {
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
  line-height: 1.5;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  flex: 1;
}

.section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.red-box {
  width: 100%;
  max-width: 400px;
  height: 250px;
  border: 2px solid #ff0000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.section-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.section-description {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.info-description {
  font-size: 14px;
  line-height: 1.4;
  max-width: 400px;
}
</style>

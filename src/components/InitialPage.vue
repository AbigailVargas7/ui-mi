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
          <img src="@/assets/user-icon.png" alt="User Icon" class="user-icon" />
          <button class="logout-button" @click="logout">Cerrar Sesión</button>
        </div>
      </header>
    </div>

    <div class="container">
      <div class="container-title">
        <!-- Título centrado -->
        <div class="page-title">Teleoperación de Equipo Solar</div>
      </div>
      <!-- Contenido principal de la página -->
      <div class="content">
        <div class="content-box">
          <div class="panel panel-1" @click="goTo('Panel')">
            <v-icon icon="mdi-solar-power-variant" style="margin-left: 20px" />
            <div class="panel-content">Panel de Monitoreo</div>
            <p class="panel-description">
              Permite observar parámetros eléctricos en tiempo real, y controlar
              el movimiento.
            </p>
          </div>
          <div class="panel panel-2" @click="goTo('Tabla')">
            <v-icon icon="mdi-human-male-board-poll" style="margin-left: 20px" />
            <div class="panel-content">Gráficas y Tablas</div>
            <p class="panel-description">
              Visualización de datos recopilados durante la sesión, graficados y
              en tablas.
            </p>
          </div>
          <div class="panel panel-3" @click="goTo('Manual')">
            <v-icon icon="mdi-file-document-check-outline" style="margin-left: 20px" />
            <div class="panel-content">Manual de Uso</div>
            <p class="panel-description">
              Guía de uso y operación del panel de Monitoreo.
            </p>
          </div>
          <div class="panel panel-4" @click="goTo('Info')">
            <v-icon icon="mdi-information-slab-circle-outline" style="margin-left: 20px" />
            <div class="panel-content">Información del Sistema</div>
            <p class="panel-description">
              Especificaciones técnicas y de rendimiento de los componentes del
              sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default {
  name: "InitialPage",
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

    const goTo = (path) => {
      router.push(`/${path}`);
    };

    return {
      logout,
      goTo,
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
  margin-right: 5px;
  background-color: transparent; /* Fondo transparente */
  color: #000000; /* Color del texto */
  border: none; /* Sin bordes */
  border-radius: 40px; /* Bordes redondeados (opcional si se necesita en el diseño) */
  cursor: pointer;
  font-weight: bold;
  font-size: 14px; /* Tamaño de la fuente ajustado */
  width: 118px; /* Ancho ajustado */
  height: 35px; /* Altura ajustada */
  transition: background-color 0.3s, color 0.3s; /* Efecto de transición para el hover */
}

/* Efecto hover opcional */
.logout-button:hover {
  background-color: rgba(
    0,
    0,
    0,
    0.1
  ); /* Ligera transparencia al pasar el ratón */
  color: #000000; /* Asegura que el texto siga siendo visible */
}
.container {
  background-image: url("@/assets/solar-background-1.png");
  background-position: center;
  background-size: cover;
  height: calc(
    100vh - 50px
  ); /* Ajusta la altura para el espacio entre la barra superior y el contenido */
}
.container-title {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 40%;
}
/* Título centrado */
.page-title {
  font-weight: 800; /* ExtraBold */
  font-size: 70px; /* Tamaño de la fuente */
  text-align: center;
  color: #ffffff;
}

.content {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinea los paneles en la parte superior */
  padding: 0px;
  height: 60%; /* Resta la altura de la barra superior */
}
.content-box {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: 100%;
  margin: 0px;
  transition: background-color 0.3s;
  background: linear-gradient(
    to bottom,
    rgba(147, 142, 142, 0.096) 0%,
    rgba(126, 126, 126, 0.6) 38%,
    rgba(39, 39, 39, 0.705) 90%
  );
}

/* Estilos para los paneles interactivos */
.panel {
  height: 100%;
  width: 16em;
  color: white;
  transition: background-color 0.3s;
  background-color: transparent;
}
.panel:hover {
  background-color: #07918a;
}
.panel-content {
  /* font-family: "Manrope", sans-serif;  */
  text-align: center;
  font-weight: 500; /* Regular */
  margin-top: 0px; /* Padding aplicado solo al contenido del texto */
  margin-right: 25px;
  margin-left: 25px;
  font-size: 200%; /* Tamaño de la fuente */
  max-width: 80%;
  max-height: 80%;
}

.panel-description {
  /* font-family: "Margarine", cursive; */
  color: white; /* Color blanco para el texto */
  text-align: center; /* Centrado horizontal */
  margin: 30px 40px; /* Limita el ancho del párrafo para evitar que se desborde */
  font-size: 110%;
  max-width: 80%;
  max-height: 80%;
}
</style>

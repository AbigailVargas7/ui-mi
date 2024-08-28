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
          >Panel de Monitoreo</v-tab
        >
        <v-tab :value="3" @click="navigateTo('/tabla')"
          >Tablas y Gráficas</v-tab
        >
        <v-tab :value="4" @click="navigateTo('/info')">Información</v-tab>
      </v-tabs>
    </v-card>
    <!-- Descripción general de la página -->
    <div class="content">
      <!-- <div class="description-title">
        En esta sección se explicará cada parte del panel de monitoreo y qué
        representa.
      </div> -->
      <!-- <v-card
        class="description-title"
        style="text-align: center"
        title="Cómo se usa este sistema remoto?"
        text="En esta sección se explicará como se maneja el panel de monitoreo, tablas y graficas."
      ></v-card> -->

      <div class="title">
        <v-card
          class="description-title"
          style="text-align: center"
          title="Cómo se usa este sistema remoto?"
          text="En esta sección se explicará como se maneja el panel de monitoreo, tablas y graficas."
        ></v-card>
      </div>

      <div class="big-content">
        <v-card
          class="description-title"
          variant="text"
          style="text-align: center"
          title="Panel de Monitoreo y Control"
        ></v-card>
        <div class="cuadro">
          <div class="cuadro-1-1">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/variables.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Variables y Parámetros</v-card-subtitle>
              <v-card-text style="text-align: justify">
                En esta sección se muestran datos obtenidos en tiempo real del
                inversor y paneles, añadiendo algunas especificaciones
                importantes para el análisis de energía fotovoltaica.
              </v-card-text>
            </v-card>
          </div>
          <div class="cuadro-1-2">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/botones1.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Botones para datos</v-card-subtitle>
              <v-card-text style="text-align: justify">
                El primer botón nos permite visualizar los datos guardados, el
                segundo captura los datos presentados de variables y parámetros
                en una tabla.
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="cuadro">
          <div class="cuadro-2-1">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/camara.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Vista de Cámara</v-card-subtitle>
              <v-card-text style="text-align: justify">
                En esta sección se pueden visualizar la instalación de los
                paneles en tiempo real, es una forma de comprobar movimientos y
                funcionamiento del sistema.
              </v-card-text>
            </v-card>
          </div>
          <div class="cuadro-2-2">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/control.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Control de inclinación</v-card-subtitle>
              <v-card-text style="text-align: justify">
                Este panel permite el control de inclinación del panel a través
                de los botones, son 23 guardados de movimiento. Cada fila
                controla un panel, siendo 3 en total. El valor mostrado es la
                salida de un sensor de giroscopio, encargado de medir el ángulo
                formado.
              </v-card-text>
            </v-card>
          </div>
        </div>

        <v-card
          class="description-title"
          variant="text"
          style="text-align: center"
          title="Tablas y Gráficas"
        ></v-card>
        <div class="cuadro">
          <div class="cuadro-3-1">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/borrar.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Botón borrar tabla</v-card-subtitle>
              <v-card-text style="text-align: justify">
                El primer botón que encontramos en esta pestaña nos ayuda a limpiar la tabla de datos
                que se han guardado desde el panel, lo que permite nuevas capturas de datos. 
              </v-card-text>
            </v-card>
          </div>
          <div class="cuadro-3-2">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/tabla.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Tabla de datos</v-card-subtitle>
              <v-card-text style="text-align: justify">
                En esta tabla se muestran todos los datos capturados desde el panel, 
                con datos de tiempo en que se guardaron. En la parte superior se muestran
                las variables, abajo los valores y por último el botón que borra únicamente las filas.
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div class="cuadro">
          <div class="cuadro-4-1">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/botones2.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Botones para Gráficas</v-card-subtitle>
              <v-card-text style="text-align: justify">
                Por medio de estos botones los valores de la tabla se reflejan en gráficas, 
                el primero genera las gráficas, el segundo las borra para una nueva representación.
              </v-card-text>
            </v-card>
          </div>
          <div class="cuadro-4-2">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/graficas.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Gráficas </v-card-subtitle>
              <v-card-text style="text-align: justify">
                En esta sección se tienen conjuntos de gráficas realizadas con datos capturados en 
                la tabla, para facilitar el análisis bajo diversas condiciones. 
              </v-card-text>
            </v-card>
          </div>

        </div>

        <div class="cuadro">
          <div class="cuadro-5-1">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/botones3.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Impresiones </v-card-subtitle>
              <v-card-text style="text-align: justify">
                Para imprimir los datos deseados se usa el botón mostrado, realiza
                la captura tanto de la tabla como las gráficas.
              </v-card-text>
            </v-card>
          </div>
          <div class="cuadro-5-2">
            <v-card class="mx-auto" max-width="300">
              <v-row align="center" justify="center" class="pa-1">
                <v-img
                  :src="require('@/assets/paneles.png')"
                  height="200px"
                  width="90%"
                  style="margin: 5px 20px"
                  contain
                ></v-img>
              </v-row>
              <v-card-subtitle> Sistema fotovoltaico </v-card-subtitle>
              <v-card-text style="text-align: justify">
               <v-icon color="red" class="mr-1">mdi-heart</v-icon>
               Recuerda que estás recibiendo datos y controlando en tiempo real un sistema fotovoltaico en 
               la Escuela Superior Politécnica del Litoral, con el fin de facilitar la comprensión y aprendizaje sobre 
               la generación de energía fotovoltaica. 
               </v-card-text>
            </v-card>
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

.content {
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}
.title {
  width: 80%;
  justify-content: space-around;
  align-items: center;
}
.description-title {
  margin: 5px;
  text-align: center;
}
.big-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.cuadro {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
  width: 10%;
  min-width: 80%;
}
/* 
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
} */
</style>

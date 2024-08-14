// Importamos las funciones necesarias de Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importamos los componentes que se utilizarán como vistas en las rutas
import LoginPage from '../components/LoginPage.vue'; // Componente de la página de inicio de sesión
import RegisterPage from '../components/RegisterPage.vue'; // Componente de la página de registro
import PanelPage from '../components/PanelPage.vue'; // Componente del panel principal

// Definimos las rutas de la aplicación
const routes = [
  { path: '/', component: LoginPage }, // Ruta para la página de inicio de sesión
  { path: '/register', component: RegisterPage }, // Ruta para la página de registro
  { path: '/panel', component: PanelPage } // Ruta para el panel principal
];

// Creamos la instancia del router utilizando el historial de navegación del navegador
const router = createRouter({
  history: createWebHistory(), // Configura el modo de historial para usar la API de History del navegador
  routes // Asigna las rutas definidas anteriormente al router
});

// Exportamos el router para que pueda ser utilizado en la instancia principal de Vue
export default router;

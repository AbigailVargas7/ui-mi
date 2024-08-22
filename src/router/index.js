// Importamos las funciones necesarias de Vue Router
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase'; // Asegúrate de tener el auth correctamente importado

// Importamos los componentes que se utilizarán como vistas en las rutas
const LoginPage = () => import('../components/LoginPage.vue'); // Lazy loading para la página de inicio de sesión
const RegisterPage = () => import('../components/RegisterPage.vue'); // Lazy loading para la página de registro
const PanelPage = () => import('../components/PanelPage.vue'); // Lazy loading para el panel principal
const TablaPage = () => import('../components/TablaPage.vue'); // Lazy loading para la tabla de datos
const InitialPage = () => import('../components/InitialPage.vue');
const InfPage = () => import('../components/InfPage.vue');
const ManualPage = () => import('../components/ManualPage.vue');
// Definimos las rutas de la aplicación
const routes = [
  { path: '/', name: 'Login', component: LoginPage }, // Ruta para la página de inicio de sesión
  { path: '/register', name: 'Register', component: RegisterPage }, // Ruta para la página de registro
  { 
    path: '/panel', 
    name: 'Panel', 
    component: PanelPage, 
    meta: { requiresAuth: true } // Protege la ruta, solo usuarios autenticados pueden acceder
  },
  { 
    path: '/tabla', 
    name: 'Tabla', 
    component: TablaPage, 
    meta: { requiresAuth: true } // Protege la ruta, solo usuarios autenticados pueden acceder
  },
  { path: '/initial', name: 'Initial', component: InitialPage },
  { path: '/info', name: 'Info', component: InfPage },
  { path: '/manual', name: 'Manual', component: ManualPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/NotFound.vue') } // Ruta 404
];

// Creamos la instancia del router utilizando el historial de navegación del navegador
const router = createRouter({
  history: createWebHistory(), // Configura el modo de historial para usar la API de History del navegador
  routes // Asigna las rutas definidas anteriormente al router
});

// Guarda de navegación global para proteger las rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

// Exportamos el router para que pueda ser utilizado en la instancia principal de Vue
export default router;

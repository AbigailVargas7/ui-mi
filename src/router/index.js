import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import PanelPage from '../components/PanelPage.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/panel', component: PanelPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

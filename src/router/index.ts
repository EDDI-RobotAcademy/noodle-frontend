import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurveyRoutes from '@/survey/router/SurveyRoutes'
import HomeRoutes from '@/Home/router/HomeRouters'
import AuthenticationRoutes from '@/authentication/router/AuthenticationRoutes'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...SurveyRoutes,
  ...AuthenticationRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

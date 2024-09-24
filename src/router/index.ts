import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurveyRoutes from '@/survey/router/SurveyRoutes'
import HomeRoutes from '@/Home/router/HomeRouters'
import project_manageRoutes from '@/project_manage/router/project_manageRouters'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...SurveyRoutes,
  ...project_manageRoutes
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

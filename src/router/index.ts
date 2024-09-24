import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurveyRoutes from '@/survey/router/SurveyRoutes'
import HomeRoutes from '@/Home/router/HomeRouters'
import ProjectManageRoutes from '@/project_manage/router/ProjectManageRouters'
import AuthenticationRoutes from '@/authentication/router/AuthenticationRoutes'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...SurveyRoutes,
  ...ProjectManageRoutes,
  ...AuthenticationRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

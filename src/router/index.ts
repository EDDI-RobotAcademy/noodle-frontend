import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SurveyRoutes from '@/survey/router/SurveyRoutes'
import HomeRoutes from '@/Home/router/HomeRouters'
import project_manageRoutes from '@/project_manage/router/ProjectManageRouters'
import AuthenticationRoutes from '@/authentication/router/AuthenticationRoutes'
import ResultReportRoutes from '@/resultReport/router/ResultReportRoutes'
import ReviewRoutes from '@/review/router/ReviewRoutes'
import MeetingRoutes from '@/meeting/router/MeetingRoutes'
import recordingRoutes from '@/recording/router/recordingTestRoutes'

const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...SurveyRoutes,
  ...project_manageRoutes,
  ...AuthenticationRoutes,
  ...ResultReportRoutes,
  ...ReviewRoutes,
  ...MeetingRoutes,
  ...recordingRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

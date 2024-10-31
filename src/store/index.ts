import authenticationModule from '@/authentication/store/authenticationModule'
import backlogModule from '@/backlog/store/backlogModules'
import productManageModule from '@/project_manage/store/productManageModule'
import surveyModule from '@/survey/store/surveyModule'
import resultReportModule from '@/resultReport/store/resultReportModule'
import { createStore } from 'vuex'
import reviewModule from '@/review/store/reviewModule'
import meetingModule from '@/meeting/store/meetingModule'
import recordingModule from '@/recording/store/recordingModules'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    surveyModule,
    authenticationModule,
    productManageModule,
    backlogModule,
    resultReportModule,
    reviewModule,
    meetingModule,
    recordingModule,
  }
})

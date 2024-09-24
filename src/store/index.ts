import authenticationModule from '@/authentication/store/authenticationModule'
import surveyModule from '@/survey/store/surveyModule'
import { createStore } from 'vuex'

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
  }
})

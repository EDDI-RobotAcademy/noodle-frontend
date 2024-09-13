import actions, { SurveyActions } from "./actions"
import state, { SurveyState } from "./states"

export interface SurveyModule {
    namespaced: true
    state: SurveyState
    actions: SurveyActions
}

const surveyModule: SurveyModule = {
    namespaced: true,
    state,
    actions,
}

export default surveyModule
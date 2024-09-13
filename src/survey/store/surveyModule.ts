import actions, { SurveyActions } from "./actions"
import state, { SurveyState } from "./states"

export interface SurveyModule {
    // namespaced가 true가 되면 앞서 *.vue 코드에서 봤듯이 아래와 같은 문법 허용
    // const boardModule = 'boardModule'
    // ...mapState(boardModule, ['boards'])
    // 즉 boardModule 자체를 위와 같이 참조할 수 있다는 의미
    namespaced: true
    state: SurveyState
    actions: SurveyActions
}

// python에서 싱글톤과 같은 역할
const surveyModule: SurveyModule = {
    namespaced: true,
    state,
    actions,
}

export default surveyModule
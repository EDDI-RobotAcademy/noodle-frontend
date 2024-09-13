import { 
    REQUEST_SURVEY_LIST_TO_DJANGO 
} from "./mutation-types";
import { SurveyState, Survey } from "./states";
import { MutationTree } from "vuex";

export interface SurveyMutations extends MutationTree<SurveyState> {
    [REQUEST_SURVEY_LIST_TO_DJANGO](state: SurveyState, receivedData: Survey[]): void
}

const mutations: MutationTree<SurveyState>={
    [REQUEST_SURVEY_LIST_TO_DJANGO](state: SurveyState, receivedData: Survey[]): void{
        state.surveys = receivedData
    }
}
export default mutations as SurveyMutations
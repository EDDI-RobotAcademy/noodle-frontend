export interface SurveyState{
    surveys: Survey[]
    survey: Survey | null
}

export interface Survey{
    surveyNumber: number
    surveyQuestionNumber: number
    surveySelectionNumber: number
}

const state: SurveyState = {
    surveys: [],
    survey: null
}

export default state
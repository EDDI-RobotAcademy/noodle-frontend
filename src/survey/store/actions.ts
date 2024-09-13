import { ActionContext } from "vuex"
import { Survey, SurveyState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type SurveyActions = {
    requestCreateSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyNumber: number, surveyQuestionNumber: number, surveySelectionNumber: number
    }): Promise<AxiosResponse>
    

}

const actions: SurveyActions = {
    async requestCreateSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyNumber: number, surveyQuestionNumber: number, surveySelectionNumber: number
    }): Promise<AxiosResponse>{

        const {surveyNumber, surveyQuestionNumber, surveySelectionNumber} = payload
        console.log('전송할 데이터:', {surveyNumber, surveyQuestionNumber, surveySelectionNumber})

        try{
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/survey/register', {surveyNumber, surveyQuestionNumber, surveySelectionNumber})

            console.log('res:', res.data)
            return res.data
        }catch(error){
            alert('requestCreateBoardToDjango() 문제 발생!')
            throw error
        }      
    }
};

export default actions
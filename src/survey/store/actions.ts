import { ActionContext } from "vuex"
import { Survey, SurveyState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type SurveyActions = {
    requestCreateSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, questions: [string], answers: [[string]]
    }): Promise<AxiosResponse>
    

}

const actions: SurveyActions = {
    async requestCreateSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, questions: [string], answers: [[string]]
    }): Promise<AxiosResponse>{
        console.log("payload:", payload)
        const {surveyId, questions, answers} = payload
        console.log('전송할 데이터:', {surveyId, questions, answers})

        try{
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/survey/register', {surveyId, questions, answers})

            console.log('res:', res.data)
            return res.data
        }catch(error){
            alert('requestCreateBoardToDjango() 문제 발생!')
            throw error
        }      
    }
};

export default actions
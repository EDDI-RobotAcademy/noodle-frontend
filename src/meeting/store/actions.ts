import { AxiosResponse } from "axios"
import { Meeting, MeetingState } from "./states"
import axiosInst from "@/utility/axiosInstance"
import { ActionContext } from "vuex"
import { REQUEST_MEETING_LIST_TO_DJANGO } from "./mutation-types"

export type MeetingActions = {
    requestMeetingListToDjango(context: ActionContext<MeetingState, any>, payload: { userToken: string, page: number | null, perPage: number | null }): Promise<any>
    requestMeetingToDjango(context: ActionContext<MeetingState, any>, meetingId: number): Promise<void>
    requestDeleteMeetingToDjango(context: ActionContext<MeetingState, unknown>, meetingId: number): Promise<void>
}

const actions: MeetingActions = {
    async requestMeetingListToDjango(context: ActionContext<MeetingState, any>, payload: { userToken: string, page: number | null, perPage: number | null }): Promise<any> {
        const { userToken, page, perPage } = payload

        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.post('/meeting-recording-summary/list', {userToken: userToken, page: page, perPage: perPage})
            const data: any[]= res.data
            // context.commit(REQUEST_MEETING_LIST_TO_DJANGO, data)
            return data
        }catch(error){
            console.error('requestMeetingListToDjango(): '+ error)
            throw error
        }
    },
    async requestMeetingToDjango(context: ActionContext<MeetingState, any>, meetingId: number): Promise<void> {
        try {
            const res: AxiosResponse<Meeting> = await axiosInst.djangoAxiosInst.get(`/meeting-recording-summary/read/${meetingId}`);
        console.log('data:', res.data)
        context.commit('REQUEST_MEETING_TO_DJANGO', res.data)
        } catch (error) {
            console.error('requestMeetingToDjango() 문제 발생:', error)
            throw error
        }
    },
    async requestDeleteMeetingToDjango(context: ActionContext<MeetingState, unknown>, meetingId: number): Promise<void>{
        try {
            console.log('requestDeleteMeetingToDjango()')
            await axiosInst.djangoAxiosInst.delete(`/meeting-recording-summary/delete/${meetingId}`)
        } catch (error) {
            console.log('requestDeleteMeetingToDjango() 과정에서 문제 발생')
            throw error
        }
    }


}

export default actions
import { AxiosResponse } from "axios"
import { Meeting, MeetingState } from "./states"
import axiosInst from "@/utility/axiosInstance"
import { ActionContext } from "vuex"
import { REQUEST_MEETING_LIST_TO_DJANGO } from "./mutation-types"

export type MeetingActions = {
    requestMeetingListToDjango(context: ActionContext<MeetingState, any>): Promise<void>
}

const actions: MeetingActions = {
    async requestMeetingListToDjango(context: ActionContext<MeetingState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/meeting/list')
            const data: Meeting[]= res.data
            context.commit(REQUEST_MEETING_LIST_TO_DJANGO, data)
        }catch(error){
            console.error('requestMeetingListToDjango(): '+ error)
            throw error
        }
    }

}

export default actions
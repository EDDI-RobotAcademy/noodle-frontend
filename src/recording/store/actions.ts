import { ActionContext } from "vuex";
import axios, { AxiosResponse } from "axios";
import axiosInst from "@/utility/axiosInstance";


export type RecordingActions = {
    requestGenerateMeetingRecordingSummary(context: ActionContext<any, any>,
        payload: { userToken: string, fileName: string }): Promise<boolean>;
    requestGetMeetingRecordingSummary(context: ActionContext<any, any>, userToken: string ): Promise<any>
};

const actions: RecordingActions = {
    async requestGenerateMeetingRecordingSummary(context: ActionContext<any, any>,
        payload: { userToken: string, fileName: string }): Promise<boolean> {
        const { userToken, fileName } = payload
        console.log("requestGenerateMeetingSummary() Start")
        console.log("userToken:", userToken)
        console.log("fileName:", fileName)

        try {
            const payload = { userToken: userToken, command: 40, data: [userToken, fileName] }
            const res = await axiosInst.djangoAxiosInst.post("/ai-request/send", payload)
            return res.data
        } catch (error) {
            console.log("requestGenerateMeetingSummary() 중 에러 발생:", error)
            throw error
        }
    },
    async requestGetMeetingRecordingSummary(context: ActionContext<any, any>, userToken: string ): Promise<any> {
        try {
            let response: AxiosResponse<any>

            const maxAttempts = 50
            const delay = 5500

            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                response = await axiosInst.djangoAxiosInst.post('/get-meeting-recording-summary/get', userToken)
                console.log("requestGetMeetingRecordingSummary:", response)

                if (response.data) {
                    console.log("response.data:", response.data)
                    return response.data
                }

                console.log(`Attempt ${attempt} failed.`)
                await new Promise(resolve => setTimeout(resolve, delay))
            }

            throw new Error('결과를 가져오는 데 실패했습니다.')
        } catch (error) {
            console.log('requestGetMeetingRecordingSummary() 중 문제 발생:', error)
            throw error
        }
    }
}


export default actions;

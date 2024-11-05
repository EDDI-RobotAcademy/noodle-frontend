import * as axiosUtility from "../../utility/axiosInstance";
import { useMeetingRecorderStore } from "./meetingRecorderStore";

export const meetingRecorderActions = {
    async requestGenerateMeetingRecordingSummary(payload): Promise<boolean> {
        const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
        const { userToken, fileName } = payload;

        console.log("requestGenerateMeetingSummary() Start");
        console.log("userToken:", userToken)
        console.log("fileName:", fileName);

        try {
            const requestPayload = { userToken: userToken, command: 40, data: [userToken, fileName] };
            const res = await djangoAxiosInst.post("/ai-request/send", requestPayload);
            return res.data;
        } catch (error) {
            console.error("requestGenerateMeetingSummary() 중 에러 발생:", error);
        }
        return false;
    },

    async requestGetMeetingRecordingSummary(userToken: string): Promise<any> {
        const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
        const meetingRecorderStore = useMeetingRecorderStore();

        try {
            let response;
            const maxAttempts = 50;
            const delay = 5500;

            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                response = await djangoAxiosInst.post('/get-meeting-recording-summary/get', { userToken });
                console.log('requestGetMeetingRecordingSummary:', response);

                if (response.data) {
                    console.log("response.data:", response.data);
                    meetingRecorderStore.summary = response.data;
                    return response.data;
                }

                console.log(`Attempt ${attempt} failed.`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            console.log('결과를 가져오는 데 실패했습니다.');
        } catch (error) {
            console.error('requestGetMeetingRecordingSummary() 중 문제 발생:', error);
        }
    }
};
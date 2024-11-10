import * as axiosUtility from "../../utility/axiosInstance";

export const meetingActions = {
	async requestMeetingListToDjango(page, perPage): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.post(
				"/meeting-recording-summary/list",
				{ page: page, perPage: perPage }
			);
			return response.data;
		} catch (error) {
			console.log(
				console.error("requestMeetingListToDjango(): " + error)
			);
		}
	},
	async requestMeetingToDjango(userToken, meetingId): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			console.log(userToken, meetingId);
			const response = await djangoAxiosInst.post(
				`/meeting-recording-summary/read`,
				{ userToken: userToken, meetingRecordingSummaryId: meetingId }
			);
			console.log(response);
			return response.data;
		} catch (error) {
			console.error("requestMeetingToDjango(): " + error);
		}
	},
	async requestRegisterMeetingToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.post(
				`/meeting-recording-summary/create`,
				payload
			);
			return response.data;
		} catch (error) {
			console.error("requestDeleteMeetingToDjango(): " + error);
		}
	},
};

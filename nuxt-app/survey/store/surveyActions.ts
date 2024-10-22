import axios from "axios";
import * as axiosUtility from "../../utility/axiosInstance";
import { useSurveyStore } from "./surveyStore";

export const surveyActions = {
	async requestSurveyToDjango(surveyId): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const surveyStore = useSurveyStore();

		try {
			const response = await djangoAxiosInst.get(
				`/survey/read/${surveyId}`
			);
			console.log(response.data);
			surveyStore.survey = response.data;
		} catch (error) {
			console.error("requestSurveyToDjango() axios 오류!", error);
		}
	},
	async requestCreateSurveyToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.post(
				"/survey/register",
				payload
			);
			return response.data;
		} catch (error) {
			console.error("requestCreateSurveyToDjango() axios 오류!", error);
		}
	},
	async requestCreateAnswerToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.post(
				"/survey/save",
				payload
			);
			return response.data;
		} catch (error) {
			console.log("requestCreateAnswerToDjango() axios 오류!", error);
		}
	},
	async requestSurveyListToDjango(): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.get("/survey/list");
			return response.data;
		} catch (error) {
			console.error("requestSurveyListToDjango() axios 오류!", error);
		}
	},
};

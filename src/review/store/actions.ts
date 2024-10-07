import { ActionContext } from "vuex";
import { Review, ReviewState } from "./states";
import { AxiosResponse } from "axios";
import { REQUEST_REVIEW_LIST_TO_DJANGO } from "./mutation-types";
import axiosInst from "@/utility/axiosInstance";

export type ReviewActions = {
	requestReviewListToDjango(
		context: ActionContext<any, any>,
		payload: { pagination: number; perPage: number }
	): Promise<void>;
};

const actions: ReviewActions = {
	async requestReviewListToDjango(
		context: ActionContext<any, any>,
        payload: { pagination: number; perPage: number }
	): Promise<void> {
		try {
            console.log('payload',payload)
			const res = await axiosInst.djangoAxiosInst.post("/review/list", payload);
			return res.data;
		} catch (error) {
			console.error("requestReviewListToDjango():" + error);
			throw error;
		}
	},
};

export default actions;

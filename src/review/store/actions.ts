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
	requestEntireReviewListCount(
		context: ActionContext<any, any>
	): Promise<void>;
	requestRegisterFreeFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { title: string; userToken: string; content: string }
	): Promise<void>;
	requestRegisterSelectionFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { userToken: string; ratingList: [number]; content: string }
	): Promise<void>;
	requestReviewDetailsToDjango(
		context: ActionContext<any, any>,
		reviewID: number
	): Promise<void>;
};

const actions: ReviewActions = {
	async requestReviewListToDjango(
		context: ActionContext<any, any>,
		payload: { pagination: number; perPage: number }
	): Promise<void> {
		try {
			const res = await axiosInst.djangoAxiosInst.post(
				"/review/list",
				payload
			);
			return res.data.list;
		} catch (error) {
			console.error("requestReviewListToDjango():" + error);
			throw error;
		}
	},
	async requestEntireReviewListCount(
		context: ActionContext<any, any>
	): Promise<void> {
		try {
			const res = await axiosInst.djangoAxiosInst.post(
				"/review/entire-count"
			);
			return res.data.count;
		} catch (error) {
			console.error("requestEntireReviewListCount():" + error);
			throw error;
		}
	},
	async requestRegisterFreeFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { title: string; userToken: string; content: string }
	): Promise<void> {
		try {
			await axiosInst.djangoAxiosInst.post(
				"/review/register/writingReview",
				payload
			);
		} catch (error) {
			console.error("error occured while registering!" + error);
			throw error;
		}
	},
	async requestRegisterSelectionFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { userToken: string; ratingList: [number]; content: string }
	): Promise<void> {
		try {
			await axiosInst.djangoAxiosInst.post(
				"/review/register/selectionReview",
				payload
			);
		} catch (error) {
			console.error("error occured while registering!" + error);
			throw error;
		}
	},
	async requestReviewDetailsToDjango(
		context: ActionContext<any, any>,
		reviewID: number
	): Promise<void> {
		try {
			const res = await axiosInst.djangoAxiosInst.post(
				"/review/read",
				reviewID
			);
			return res.data;
		} catch (error) {
			console.error("error occured while getting details!" + error);
			throw error;
		}
	},
};

export default actions;

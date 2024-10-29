import * as axiosUtility from "../../utility/axiosInstance";

export const reviewActions = {
	async requestReviewListToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const res = await djangoAxiosInst.post("/review/list", payload);
			return res.data.list;
		} catch (error) {
			console.error("requestReviewListToDjango():" + error);
		}
	},
	async requestEntireReviewListCount(): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const res = await djangoAxiosInst.post("/review/entire-count");
			return res.data.count;
		} catch (error) {
			console.error("requestEntireReviewListCount():" + error);
		}
	},
	async requestRegisterFreeFormReviewToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post(
				"/review/register/writingReview",
				payload
			);
		} catch (error) {
			console.error("error occured while registering!" + error);
		}
	},
	async requestRegisterSelectionFormReviewToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post(
				"/review/register/selectionReview",
				payload
			);
		} catch (error) {
			console.error("error occured while registering!" + error);
		}
	},
	async requestReviewDetailsToDjango(reviewID): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.post(
				"/review/read",
				reviewID
			);
			return response.data;
		} catch (error) {
			console.error("error occured while getting details!" + error);
		}
	},
	async requestModifyReviewToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post("/review/modify", payload);
		} catch (error) {
			console.error("error occured while modifying review!" + error);
		}
	},
	async requestDeleteReviewToDjango(id, name): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post("/review/delete", {
				reviewID: id,
				userToken: localStorage.getItem("userToken"),
				writer: name,
			});
		} catch (error) {
			console.error("error occured while deleting review!" + error);
			if (error.response && error.response.status === 401) {
				alert("작성자만 삭제할 수 있습니다.");
			}
		}
	},
};

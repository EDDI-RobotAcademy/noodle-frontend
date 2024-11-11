import * as axiosUtility from "../../utility/axiosInstance";

export const subscriptionPaymentsActions = {
	async requestRegisterSubscriptionToDjango(
		userToken,
		type,
		paymentID
	): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post("/subscription/register", {
				userToken: userToken,
				ticket: type,
				paymentID: paymentID,
			});
		} catch (error) {
			console.error(
				"requestRegisterSubscriptionToDjango() axios 오류!",
				error
			);
		}
	},
	async requestCheckSubscription(userToken): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		try {
			const response = await djangoAxiosInst.post("/subscription/check", {
				userToken: userToken,
			});
			return response.data.type;
		} catch (error) {
			console.error("requestCheckSubscription() axios 오류!", error);
		}
	},
};

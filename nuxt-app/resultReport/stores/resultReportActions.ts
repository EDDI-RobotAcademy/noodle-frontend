import * as axiosUtility from "../../utility/axiosInstance";
import { useResultReportStore } from "./resultReportStore";

export const resultReportActions = {
	async requestUserValidationToDjango(id, userToken): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.post("/report/validate", {
				id,
				userToken,
			});
			return response.data;
		} catch (error) {
			console.error("requestUserValidationToDjango() axios 오류!", error);
		}
	},
	async requestModifyResultReportToDjango(
		id,
		payload,
		userToken
	): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post("/report/modify", {
				id: id,
				modifiedReport: payload,
				userToken: userToken,
			});
		} catch (error) {
			console.error(
				"requestModifyResultReportToDjango() axios 오류!",
				error
			);
		}
	},
		} catch (error) {
			console.error(
				"requestResultReportListToDjango() axios 오류!",
				error
			);
		}
	},
	async requestResultReportToDjango(resultReportId): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.get(
				`/report/read/${resultReportId}`
			);
			return response.data;
		} catch (error) {
			console.error("requestResultReportToDjango() 문제 발생:", error);
		}
	},
	async requestDeleteResultReportToDjango(resultReportId): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.delete(
				`/report/delete/${resultReportId}`
			);
		} catch (error) {
			console.error(
				"requestDeleteResultReportToDjango() 과정에서 문제 발생"
			);
		}
	},
	async requestCreateResultReportToDjango(
		title,
		overview,
		teamMemberList,
		skillList,
		featureList,
		usage,
		improvementList,
		completionList,
		userToken
	): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await djangoAxiosInst.post("/report/create", {
				title,
				overview,
				teamMemberList,
				skillList,
				featureList,
				usage,
				improvementList,
				completionList,
				userToken,
			});
			return response.data;
		} catch (error) {
			alert("requestCreateResultReportToDjango() 문제 발생");
		}
	},
	async requestGenerateResultReportToFastAPI(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const { userToken, reponame, branchname } = payload;
			const response = await djangoAxiosInst.post("/ai-request/send", {
				userToken: userToken,
				command: 31,
				data: [userToken, reponame, branchname],
			});
			return response.data;
		} catch (error) {
			console.error("requestGenerateResultReportToFastAPI() 문제 발생");
		}
	},
	async requestGetResultReportResultToFastAPI(userToken): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		const maxAttempts = 100;
		const dalay = 5000;

		try {
			for (let attempt = 0; attempt < maxAttempts; attempt++) {
				const response = await djangoAxiosInst.post(
					"/get-result-report/get",
					{ userToken: userToken }
				);
				if (response.data) {
					return response.data;
				}
				console.log(`Attempt ${attempt} failed.`);
				await new Promise((resolve) => setTimeout(resolve, dalay));
			}
			throw new Error("결과를 가져오는 데 실패했습니다.");
		} catch (error) {
			console.error(
				"requestGetResultReportResultToFastAPI() 중 문제 발생:",
				error
			);
		}
	},
};

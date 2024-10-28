import * as axiosUtility from "../../utility/axiosInstance";
import { useResultReportStore } from "./resultReportStore";

export const resultReportActions = {
	async requestResultReportListToDjango(): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const resultReportStore = useResultReportStore();

		try {
			const response = await djangoAxiosInst.get("/report/list");
			resultReportStore.resultReportList = response.data;
		} catch (error) {
			console.error(
				"requestResultReportListToDjango() axios 오류!",
				error
			);
		}
	},
};

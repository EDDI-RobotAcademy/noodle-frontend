import * as axiosUtility from "../../utility/axiosInstance";
import { useProjectManageStore } from "./projectManageStore";

export const projectManageActions = {
	async requestSaveReposListToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post("/repos/save", payload);
		} catch (error) {
			console.error("requestSaveReposListToDjango() axios 오류!", error);
		}
	},
	async requestGetReposListToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const projectManageStore = useProjectManageStore();

		try {
			const response = await djangoAxiosInst.post("/repos/list", payload);
			projectManageStore.repos = response.data.repo_list;
		} catch (error) {
			console.error("requestGetReposListToDjango() axios 오류!", error);
		}
	},
	async requestSaveBranchListToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post("/branches/save", payload);
		} catch (error) {
			console.error("requestSaveBranchListToDjango() axios 오류!", error);
		}
	},
	async requestGetBranchListToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const projectManageStore = useProjectManageStore();

		try {
			const response = await djangoAxiosInst.post(
				"/branches/list",
				payload
			);
			projectManageStore.branches = response.data.branch_list;
		} catch (error) {
			console.error("requestGetBranchListToDjango() axios 오류!", error);
		}
	},
	async requestSaveCommitListToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			await djangoAxiosInst.post("/commits/save", payload);
		} catch (error) {
			console.error("requestSaveCommitListToDjango() axios 오류!", error);
		}
	},
	async requestGetCommitListToDjango(payload): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const projectManageStore = useProjectManageStore();

		try {
			const response = await djangoAxiosInst.post(
				"/commits/list",
				payload
			);
			projectManageStore.commits = response.data.commit_list;
		} catch (error) {
			console.error("requestGetCommitListToDjango() axios 오류!", error);
		}
	},
};

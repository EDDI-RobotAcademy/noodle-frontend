import * as axiosUtility from "../../utility/axiosInstance";

export const backlogActions = {
	async requestGenerateBacklogToFastAPI(payload): Promise<void> {
		const { fastapiAxiosInst } = axiosUtility.createAxiosInstances();
		try {
			const { username, reponame, branchname } = payload;
			const command = 6;

			const response = await fastapiAxiosInst.post(
				"/request-ai-command",
				{ command, data: [username, reponame, branchname] }
			);
			return response.data;
		} catch (error) {
			console.log(
				"requestGenerateBacklogToFastAPI() 중 문제 발생!: ",
				error
			);
		}
	},
	async requestBacklogListToFastAPI(): Promise<void> {
		const { fastapiAxiosInst } = axiosUtility.createAxiosInstances();

		try {
			const response = await fastapiAxiosInst.get(
				"/generate-backlog-result"
			);
			return response.data.message;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	},
};

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
	async requestBacklogListToDjango(userToken, attempt = 1): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const maxAttempts = 50;
		const delay = 5000;

		try {
			const response = await djangoAxiosInst.post("/backlog/get", {
				userToken,
			});

			if (response.data.response === "creation is not done yet!") {
				if (attempt < maxAttempts) {
					return new Promise((resolve) =>
						setTimeout(
							() =>
								resolve(
									this.requestBacklogListToDjango(
										userToken,
										attempt + 1
									)
								),
							delay
						)
					);
				} else {
					alert(
						"서버의 응답이 지연되고 있습니다. 잠시 후 다시 시도 해 주세요"
					);
					return;
				}
			}
			return response.data.response;
		} catch (error) {
			console.error("Error fetching data:", error);
			if (error.response && error.response.status === 401) {
				alert("유효한 사용자가 아닙니다!");
			}
		}
	},
};

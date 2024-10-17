import * as axiosUtility from "../../utility/axiosInstance";

export const authenticationActions = {
	async requestGithubOauthRedirectionToDjango(): Promise<void> {
		const {djangoAxiosInst} = axiosUtility.createAxiosInstances();
        try{
            return await djangoAxiosInst.get("/github/oauth/github").then((res) => {
                window.location.href = res.data.url;
            })
        } catch (error) {
            console.error("requestGithubOauthRedirectionToDjango() axios 오류!", error)
        }
	},
    async requestAccessTokenToDjangoRedirection(code): Promise<void> {
        const {djangoAxiosInst} = axiosUtility.createAxiosInstances();
        try{
            const response = await djangoAxiosInst.post('/github-oauth/github/access-token', code)
            return response.data
        } catch (error) {
            console.error("requestAccessTokenToDjangoRedirection() axios 오류!", error)
        }
    }
};

import { tryUseNuxtApp } from "nuxt/app";
import * as axiosUtility from "../../utility/axiosInstance";
import { useAuthenticationStore } from "./authenticationStore";

export const authenticationActions = {
	async requestGithubOauthRedirectionToDjango(): Promise<void> {
		const {djangoAxiosInst} = axiosUtility.createAxiosInstances();
        try{
            return await djangoAxiosInst.get("/github-oauth/github").then((res) => {
                window.location.href = res.data.url;
            })
        } catch (error) {
            console.error("requestGithubOauthRedirectionToDjango() axios 오류!", error)
        }
	},
    async requestAccessTokenToDjangoRedirection(code): Promise<void> {
        const {djangoAxiosInst} = axiosUtility.createAxiosInstances();
        const authenticationStore = useAuthenticationStore()

        try{
            const response = await djangoAxiosInst.post('/github-oauth/github/access-token', code)
            authenticationStore.isAuthenticated = true
            console.log(authenticationStore.isAuthenticated)
            return response.data
        } catch (error) {
            console.error("requestAccessTokenToDjangoRedirection() axios 오류!", error)
        }
    },
    async requestLogoutToDjango():Promise<void>{
        const {djangoAxiosInst} = axiosUtility.createAxiosInstances();
        const authenticationStore = useAuthenticationStore()

        try{
            const userToken = localStorage.getItem('userToken');
            await djangoAxiosInst.post('/github-oauth/github/logout', {"userToken": userToken})
            authenticationStore.isAuthenticated = false
            localStorage.removeItem('userToken')
        } catch(error){
            console.error("requestLogoutToDjango() axios 오류!", error)
        }
    }
};

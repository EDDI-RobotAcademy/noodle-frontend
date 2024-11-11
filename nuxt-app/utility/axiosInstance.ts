import axios, { AxiosInstance } from "axios";
import { useRuntimeConfig } from "nuxt/app";

let djangoAxiosInst: AxiosInstance | null = null;
let fastapiAxiosInst: AxiosInstance | null = null;

export function createAxiosInstances() {
	const config = useRuntimeConfig()

	const mainApiUrl: string = config.public.MAIN_API_URL as string
	const aiBaseUrl: string = config.public.AI_BASE_URL as string

	if (!djangoAxiosInst) {
		const config = useRuntimeConfig();
		djangoAxiosInst = axios.create({
			baseURL: mainApiUrl,
			timeout: 10000,
		});
	}

	if (!fastapiAxiosInst) {
		const config = useRuntimeConfig();
		fastapiAxiosInst = axios.create({
			baseURL: aiBaseUrl,
			timeout: 10000,
		});
	}

	return { djangoAxiosInst, fastapiAxiosInst };
}

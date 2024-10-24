import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: false },
	extends: [
		"./authentication/nuxt.config.ts",
		"./projectManage/nuxt.config.ts",
		"./resultReport/nuxt.config.ts",
		"./review/nuxt.config.ts",
		"./survey/nuxt.config.ts",
		"./backlog/nuxt.config.ts",
	],

	css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.min.css"],

	build: {
		transpile: ["vuetify"], // Vuetify를 빌드 시 트랜스파일링
	},

	vite: {
		server: {
			ws: false,
			hmr: false,
		},
		ssr: {
			noExternal: ["vuetify"],
		},
	},

	modules: [
		"vuetify-nuxt-module",
		"@pinia/nuxt",
		"~/authentication/index.ts",
		"~/projectManage/index.ts",
		"~/resultReport/index.ts",
		"~/review/index.ts",
		"~/survey/index.ts",
		"~/backlog/index.ts",
	],

	imports: {
		dirs: ["./stores"],
	},

	runtimeConfig: {
		public: {
			MAIN_API_URL: process.env.VUE_APP_BASE_URL,
			AI_BASE_URL: process.env.VUE_APP_AI_BASE_URL,
			// AWS_REGION: process.env.VUE_APP_AWS_REGION,
			// AWS_S3_IDENTITY_POOL: process.env.VUE_APP_AWS_S3_IDENTITY_POOL_ID,
		},
	},
	app: {
		head: {
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
			],
			link: [
				{
					rel: "icon",
					type: "image/x-icon",
					href: "noodle.ico",
				},
			],
			title: "NOODLE | Use Your Noodle!",
		},
	},
});

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	extends: [
		"./authentication/nuxt.config.ts",
		"./projectManage/nuxt.config.ts",
		"./resultReport/nuxt.config.ts",
		"./review/nuxt.config.ts",
		"./survey/nuxt.config.ts",
		"./backlog/nuxt.config.ts",
		"./payments/nuxt.config.ts",
	],

	css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.min.css"],

	build: {
		transpile: ["vuetify"], // Vuetify를 빌드 시 트랜스파일링
	},

	vite: {
    server: {
			// ws: false,
			hmr: true,
		},
		ssr: {
			noExternal: ["vuetify"], // SSR에서도 Vuetify를 외부 패키지로 처리하지 않도록 설정
		},
	},

	modules: [
		"vuetify-nuxt-module",
		"@pinia/nuxt",
		"@nuxtjs/seo",
		"~/authentication/index.ts",
		"~/projectManage/index.ts",
		"~/resultReport/index.ts",
		"~/review/index.ts",
		"~/survey/index.ts",
		"~/backlog/index.ts",
		"~/payments/index.ts",
	],

	imports: {
		dirs: ["./stores"],
	},

	runtimeConfig: {
		public: {
			MAIN_API_URL: process.env.VUE_APP_BASE_URL,
			AI_BASE_URL: process.env.VUE_APP_AI_BASE_URL,
			TOSS_CLIENT_KEY : process.env.TOSS_CLIENT_KEY,
			TOSS_SECRET_KEY : process.env.TOSS_SECRET_KEY,
			// AWS_REGION: process.env.VUE_APP_AWS_REGION,
			// AWS_S3_IDENTITY_POOL: process.env.VUE_APP_AWS_S3_IDENTITY_POOL_ID,
		},
	},

	app: {
		head: {
			title: "NOODLE | Use Your Noodle!",
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					hid: 'description',
					name: 'description',
					content: '프로젝트를 효과적으로 관리하기 위해 NOODLE 서비스를 탐색하고 활용하세요. 백로그 관리, 프로젝트 보고서 작성 등의 기능을 사용해보세요.'
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: 'Noodle, NOODLE, 프로젝트 관리, 백로그, 프로젝트 보고서, 협업, AI 보고서, 보고서 생성'
				},
				{
					property: 'og:title',
					content: 'NOODLE | Use Your Noodle!'
				},
				{
					property: 'og:description',
					content: '프로젝트를 효과적으로 관리하기 위해 NOODLE 서비스를 탐색하고 활용하세요.'
				},
				{
					property: 'og:image',
					content: './public/fixed/NOODLE_logo.png'
				},
				{
					property: 'og:type',
					content: 'website'
				},
				{
					name: 'twitter:card',
					content: '/public/fixed/NOODLE_logo.png'
				},
				{
					name: 'twitter:title',
					content: 'NOODLE | Use Your Noodle!'
				},
				{
					name: 'twitter:description',
					content: '프로젝트를 효과적으로 관리하기 위해 NOODLE 서비스를 탐색하고 활용하세요'
				},
				{
					name: 'twitter:image',
					content: '/public/fixed/NOODLE_logo.png'
				},
				{
					hid: 'robots',
					name: 'robots',
					content: 'index, follow'
				}
			],
			link: [
				{
					rel: "icon",
					type: "image/x-icon",
					href: "noodle.ico",
				},
				{
					rel: 'canonical',
					href: 'https://noo-dle.com/'
				}
			],
		},
	},
});
import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "survey",
		configKey: "survey",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push(
				{
					name: "surveyList",
					path: "/survey/list",
					file: resolve(themeDir, "survey/pages/list/surveyList.vue"),
				},
				{
					name: "surveyRegister",
					path: "/survey/register",
					file: resolve(
						themeDir,
						"survey/pages/register/surveyRegister.vue"
					),
				},
				{
					name: "surveyRead",
					path: "/survey/read/:id",
					file: resolve(themeDir, "survey/pages/read/surveyRead.vue"),
				},
				{
					name: "surveyThanks",
					path: "/survey/thanks",
					file: resolve(
						themeDir,
						"survey/pages/thanks/surveyThanks.vue"
					),
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "store"));
		});
	},
});

import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "resultReport",
		configKey: "resultReport",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push(
				{
					name: "resultReportList",
					path: "/resultReport/list",
					file: resolve(
						themeDir,
						"resultReport/pages/list/resultReportList.vue"
					),
				},
				{
					name: "resultResultModify",
					path: "/resultReport/modify/1",
					file: resolve(
						themeDir,
						"resultReport/pages/modify/resultReportModify.vue"
					),
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "store"));
		});
	},
});

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
                    name: "resultReportRegister",
                    path: "/resultReport/register",
                    file: resolve(
                        themeDir,
                        "resultReport/pages/register/resultReportRegister.vue"
                    )
                },
                // 아래 페이지들의 정규화 필요
				{
					name: "resultReportRead",
					path: "/resultReport/read/1",
					file: resolve(
						themeDir,
						"resultReport/pages/read/resultReportRead.vue"
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

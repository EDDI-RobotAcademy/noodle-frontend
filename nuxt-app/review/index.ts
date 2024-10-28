import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "review",
		configKey: "review",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push(
				{
					name: "ReviewListPage",
					path: "/review/list/:page",
					file: resolve(themeDir, "review/pages/list/reviewList.vue"),
				},
				{
					name: "ReviewPage",
					path: "/review/register",
					file: resolve(
						themeDir,
						"review/pages/register/reviewRegister.vue"
					),
				},
				{
					name: "reviewRead",
					path: "/review/read/:page/:id",
					file: resolve(themeDir, "review/pages/read/reviewRead.vue"),
				},
				{
					name: "ReviewModifyPage",
					path: "/review/modify/:page/:id",
					file: resolve(
						themeDir,
						"review/pages/modify/reviewModify.vue"
					)
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "stores"));
		});
	},
});

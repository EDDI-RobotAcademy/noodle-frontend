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
					path: "/review/list",
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
					path: "/review/read/:id",
					file: resolve(themeDir, "review/pages/read/reviewRead.vue"),
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "stores"));
		});
	},
});

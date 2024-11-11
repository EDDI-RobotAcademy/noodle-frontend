import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "meeting",
		configKey: "meeting",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push(
				{
					name: "meeting",
					path: "/meeting/list",
					file: resolve(
						themeDir,
						"meeting/pages/list/meetingList.vue"
					),
				},
				{
					name: "meetingRead",
					path: "/meeting/read/:id",
					file: resolve(
						themeDir,
						"meeting/pages/read/meetingRead.vue"
					),
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "store"));
		});
	},
});

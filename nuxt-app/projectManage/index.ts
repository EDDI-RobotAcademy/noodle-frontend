import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "projectManage",
		configKey: "projectManage",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push({
				name: "projectManage",
				path: "/projectManage",
                file: resolve(themeDir, "projectManage/pages/projectManage.vue"),
			});
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "store"));
		});
	},
});

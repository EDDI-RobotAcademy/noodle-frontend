import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "backlog",
		configKey: "backlog",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "store"));
		});
	},
});

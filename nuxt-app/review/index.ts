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
      pages.push({
        name: "ReviewListPage",
        path: "/review/list",
        file: resolve(themeDir, "review/pages/list/reviewList.vue"),
      });
    });

    nuxt.hook("pages:extend", (pages) => {
      pages.push({
        name: "ReviewPage",
        path: "/review/register",
        file: resolve(themeDir, "review/pages/register/reviewRegister.vue"),
      });
    });

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "stores"));
    });
  },
});
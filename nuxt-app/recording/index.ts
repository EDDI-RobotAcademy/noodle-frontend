import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
    meta: {
        name: "meetingRecorder",
        configkey: "meetingRecorder",
    },

    setup(moduleOptions, nuxt) {
        const themeDir = resolve(__dirname, "..");

        nuxt.hook("pages:extend", (pages) => {
            pages.push({
                name: "meetingRecorder",
                path: "/meeting-recorder"
            });
        });

        nuxt.hook("imports:dirs", (dirs) => {
            dirs.push(resolve(__dirname, "store"));
        });
    },
});
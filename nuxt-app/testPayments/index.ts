import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "payments",
		configKey: "payments",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push(
				{
					name: "paymentsTestPage",
					path: "/test/payments/page/90785634",
					file: resolve(
						themeDir,
						"testPayments/pages/startPayment/testPayments.vue"
					),
				},
				{
					name: "paymentSuccessed",
					path: "/test/payment/success/90785634",
					file: resolve(
						themeDir,
						"testPayments/pages/paymentStatus/paymentSuccessed.vue"
					),
				},
				{
					name: "paymentFailed",
					path: "/test/payment/fail/90785634",
					file: resolve(
						themeDir,
						"testPayments/pages/paymentStatus/paymentFailed.vue"
					),
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "stores"));
		});
	},
});

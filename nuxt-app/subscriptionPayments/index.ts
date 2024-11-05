import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
	meta: {
		name: "subscriptionPayments",
		configKey: "subscriptionPayments",
	},

	setup(moduleOptions, nuxt) {
		const themeDir = resolve(__dirname, "..");

		nuxt.hook("pages:extend", (pages) => {
			pages.push(
				{
					name: "SubscriptionTicketDescriptionPage",
					path: "/subscriptionTicketDescription",
					file: resolve(
						themeDir,
						"subscriptionPayments/pages/description/subscriptionTicketDescriptionPage.vue"
					),
				},
				{
					name: "SubscriptionPaymentFailed",
					path: "/subscription/payment/fail",
					file: resolve(
						themeDir,
						"subscriptionPayments/pages/paymentResult/paymentFailed.vue"
					),
				},
				{
					name: "SubscriptionPaymentSuccess",
					path: "/subscription/payment/:type/success",
					file: resolve(
						themeDir,
						"subscriptionPayments/pages/paymentResult/paymentSuccess.vue"
					),
				},
				{
					name: "SubscriptionPaymentA",
					path: "/subscription/payment/type1",
					file: resolve(
						themeDir,
						"subscriptionPayments/pages/payment/ticketASubscribe.vue"
					),
				},
				{
					name: "SubscriptionPaymentB",
					path: "/subscription/payment/type2",
					file: resolve(
						themeDir,
						"subscriptionPayments/pages/payment/ticketBSubscribe.vue"
					),
				},
				{
					name: "SubscriptionPaymentC",
					path: "/subscription/payment/type3",
					file: resolve(
						themeDir,
						"subscriptionPayments/pages/payment/ticketCSubscribe.vue"
					),
				}
			);
		});

		nuxt.hook("imports:dirs", (dirs) => {
			dirs.push(resolve(__dirname, "stores"));
		});
	},
});

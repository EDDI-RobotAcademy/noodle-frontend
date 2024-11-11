import { defineStore } from "pinia";
import { subscriptionPaymentsActions } from "./subscriptionPaymentsActions";

export const useSubscriptionPaymentsStore = defineStore(
	"subscriptionPaymentStore",
	{
		actions: subscriptionPaymentsActions,
	}
);

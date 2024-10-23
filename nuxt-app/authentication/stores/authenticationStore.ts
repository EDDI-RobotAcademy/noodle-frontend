import { authenticationActions } from "./authentiactionActions";
import { authenticationState } from "./authenticationState";
import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore("authenticationStore", {
	state: authenticationState,
	actions: authenticationActions,
});

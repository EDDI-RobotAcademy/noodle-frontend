import { defineStore } from "pinia";
import { backlogActions } from "./backlogActions";
import { backlogState } from "./backlogState";

export const useBacklogStore = defineStore("backlogStore", {
	actions: backlogActions,
	state: backlogState,
});

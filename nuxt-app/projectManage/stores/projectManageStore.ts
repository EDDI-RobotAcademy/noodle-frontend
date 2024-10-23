import { defineStore } from "pinia";
import { projectManageState } from "./projectManageState";
import { projectManageActions } from "./projectManageActions";

export const useProjectManageStore = defineStore("projectManageStore", {
	state: projectManageState,
	actions: projectManageActions,
});

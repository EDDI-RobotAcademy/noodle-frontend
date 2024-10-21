import { defineStore } from "pinia";
import { resultReportActions } from "./resultReportActions";
import { resultReportState } from "./resultReportState";

export const useResultReportStore = defineStore("resultReportStore", {
	state: resultReportState,
	actions: resultReportActions,
});

import { defineStore } from "pinia";
import { meetingActions } from "./meetingActions";

export const useMeetingStore = defineStore("meetingStore", {
	actions: meetingActions,
});

import { defineStore } from "pinia";
import { meetingRecorderState } from "./meetingRecorderState";
import { meetingRecorderActions } from "./meetingRecorderActions";

export const useMeetingRecorderStore = defineStore("meetingRecorderStore", {
    state: meetingRecorderState,
    actions: meetingRecorderActions,
});
import { 
    REQUEST_MEETING_LIST_TO_DJANGO,
    REQUEST_MEETING_TO_DJANGO
} from "./mutation-types";
import { MeetingState, Meeting } from "./states";
import { MutationTree } from "vuex";

export interface MeetingMutations extends MutationTree<MeetingState> {
    [REQUEST_MEETING_LIST_TO_DJANGO](state: MeetingState, receivedData: Meeting[]): void
    [REQUEST_MEETING_TO_DJANGO](state: MeetingState, receivedData: Meeting): void
}

const mutations: MutationTree<MeetingState>={
    [REQUEST_MEETING_LIST_TO_DJANGO](state: MeetingState, receivedData: Meeting[]): void{
        state.meetings = receivedData
    },
    [REQUEST_MEETING_TO_DJANGO](state: MeetingState, receivedData: Meeting): void{
        state.meeting = receivedData
    }
}

export default mutations as MeetingMutations
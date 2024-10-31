import actions, { MeetingActions } from "./actions"
import mutations, { MeetingMutations } from "./mutations"
import state, { MeetingState } from "./states"


export interface MeetingModule {
    namespaced: true
    state: MeetingState
    actions: MeetingActions
    mutations: MeetingMutations
}


const meetingModule: MeetingModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default meetingModule
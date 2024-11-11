import actions, { RecordingActions } from "./actions"


export interface ProductManageModule {
    namespaced: true
    actions: RecordingActions
}

const recordingModule: ProductManageModule = {
    namespaced: true,
    actions,
}

export default recordingModule